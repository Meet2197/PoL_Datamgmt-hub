# --- IMPORTS ---
from flask import Flask, request, jsonify, g
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime

# --- APPLICATION SETUP ---
app = Flask(__name__)
CORS(app)

# Define the path for the SQLite database file
DATABASE = 'database.db'

# --- DATABASE FUNCTIONS ---
# This function connects to the SQLite database
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        # Set the row factory to sqlite3.Row to allow fetching results as dictionaries
        db.row_factory = sqlite3.Row
    return db

# This function closes the database connection at the end of each request
@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# This function initializes the database and creates the 'data' table with more fields
def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        # Expanded the data table with description, category, and a timestamp for creation
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                category TEXT,
                created_at TEXT NOT NULL
            )
        ''')
        db.commit()
        # Seed the database with some sample data for testing
        seed_db()

def seed_db():
    """Seeds the database with some initial data if the table is empty."""
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT COUNT(*) FROM data")
    count = cursor.fetchone()[0]

    if count == 0:
        sample_data = [
            ("Project A", "Description for project A.", "Engineering", datetime.now().isoformat()),
            ("Research Paper B", "Summary of research paper B.", "Science", datetime.now().isoformat()),
            ("Marketing Campaign C", "Details of marketing campaign C.", "Marketing", datetime.now().isoformat()),
            ("Financial Report D", "Annual financial report.", "Finance", datetime.now().isoformat()),
            ("Customer Feedback E", "Feedback from recent customer surveys.", "Customer Service", datetime.now().isoformat()),
        ]
        cursor.executemany("INSERT INTO data (title, description, category, created_at) VALUES (?, ?, ?, ?)", sample_data)
        db.commit()
        print("Database seeded with initial data.")

# --- API ENDPOINTS ---
# Add a basic homepage route to avoid 404 errors when a user visits the root URL.
@app.route('/')
def index():
    return "<h1>Welcome to the Expanded Python Backend!</h1><p>The API endpoints are available at /api/data/.</p>"

# Endpoint to retrieve all data (deprecated in favor of search for efficiency)
@app.route('/api/data/', methods=['GET'])
def get_all_data():
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM data")
    data_items = cursor.fetchall()
    data_list = [dict(item) for item in data_items]
    return jsonify(data_list)

# Endpoint for searching and paginating data
# This is more efficient for large datasets than retrieving all data at once.
@app.route('/api/data/search', methods=['GET'])
def search_data():
    db = get_db()
    cursor = db.cursor()
    
    # Get query parameters for pagination and search
    query = request.args.get('q', '')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    offset = (page - 1) * per_page
    
    # Base query
    sql_query = "SELECT * FROM data"
    params = []
    
    # Add search functionality if a query is provided
    if query:
        # Search across multiple fields (title, description, category)
        sql_query += " WHERE title LIKE ? OR description LIKE ? OR category LIKE ?"
        search_term = f"%{query}%"
        params.extend([search_term, search_term, search_term])
    
    # Add sorting and pagination
    sql_query += " ORDER BY created_at DESC LIMIT ? OFFSET ?"
    params.extend([per_page, offset])

    cursor.execute(sql_query, params)
    data_items = cursor.fetchall()
    data_list = [dict(item) for item in data_items]

    # Get total count for pagination metadata
    count_query = "SELECT COUNT(*) FROM data"
    if query:
        count_query += " WHERE title LIKE ? OR description LIKE ? OR category LIKE ?"
        cursor.execute(count_query, params[:-2]) # Exclude LIMIT and OFFSET params
    else:
        cursor.execute(count_query)
    
    total_count = cursor.fetchone()[0]

    return jsonify({
        "data": data_list,
        "page": page,
        "per_page": per_page,
        "total_items": total_count,
        "total_pages": (total_count + per_page - 1) // per_page
    })

# Endpoint to retrieve a single data item by its ID
@app.route('/api/data/<int:item_id>', methods=['GET'])
def get_data_item(item_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM data WHERE id = ?", (item_id,))
    data_item = cursor.fetchone()
    if data_item:
        return jsonify(dict(data_item))
    else:
        return jsonify({"error": "Data item not found"}), 404

# Endpoint to create a new data item
@app.route('/api/data/create', methods=['POST'])
def create_data_item():
    new_data = request.get_json()
    title = new_data.get('title')
    description = new_data.get('description', '')
    category = new_data.get('category', '')
    created_at = datetime.now().isoformat()

    if not title:
        return jsonify({"error": "Title is required"}), 400

    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO data (title, description, category, created_at) VALUES (?, ?, ?, ?)",
                   (title, description, category, created_at))
    db.commit()
    new_id = cursor.lastrowid
    return jsonify({"id": new_id, "title": title, "description": description, "category": category, "created_at": created_at}), 201

# Endpoint to update an existing data item
@app.route('/api/data/<int:item_id>', methods=['PUT', 'PATCH'])
def update_data_item(item_id):
    updated_data = request.get_json()
    title = updated_data.get('title')
    description = updated_data.get('description')
    category = updated_data.get('category')

    db = get_db()
    cursor = db.cursor()
    
    # Build the UPDATE query dynamically based on which fields are provided
    update_fields = []
    params = []
    if title is not None:
        update_fields.append("title = ?")
        params.append(title)
    if description is not None:
        update_fields.append("description = ?")
        params.append(description)
    if category is not None:
        update_fields.append("category = ?")
        params.append(category)

    if not update_fields:
        return jsonify({"error": "No fields to update"}), 400

    sql_query = "UPDATE data SET " + ", ".join(update_fields) + " WHERE id = ?"
    params.append(item_id)

    cursor.execute(sql_query, params)
    db.commit()

    if cursor.rowcount == 0:
        return jsonify({"error": "Data item not found"}), 404

    return jsonify({"message": "Data item updated successfully"})


# Endpoint to delete a data item
@app.route('/api/data/<int:item_id>', methods=['DELETE'])
def delete_data_item(item_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM data WHERE id = ?", (item_id,))
    db.commit()

    if cursor.rowcount == 0:
        return jsonify({"error": "Data item not found"}), 404

    return jsonify({"message": "Data item deleted successfully"})

# --- MAIN EXECUTION ---
if __name__ == '__main__':
    # Initialize the database and create a table before running the app
    init_db()
    # Run the Flask development server on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)