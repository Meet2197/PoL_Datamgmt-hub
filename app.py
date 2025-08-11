

# app.py
from flask import Flask, request, jsonify
# Assume you have your chatbot logic in a separate file or function
from your_chatbot_logic import process_message

app = Flask(__name__)

@app.route('/api/chatbot', methods=['POST'])
def handle_chatbot_request():
    # Get the data (the user's message) from the incoming request
    data = request.get_json()
    user_message = data.get('message', '')

    # Process the message using your Python logic
    response_message = process_message(user_message)

    # Return the response as JSON
    return jsonify({"response": response_message})

if __name__ == '__main__':
    app.run(debug=True)