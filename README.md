# PoL Data Management Hub

This repository contains the front-end and a Python-based back-end for a Physics of Life (PoL) Exc Data Management Corner. The application allows users to view, search, and manage a collection of data records. The front end is built with HTML, CSS (Tailwind CSS), and JavaScript, while the back end uses the Flask framework with a SQLite database to provide a RESTful API.

# 🌟 Overview
The PoL Data Management Hub is a central web platform designed to provide researchers at the Physics of Life (PoL) institute with a comprehensive set of resources, guidelines, and tools for effective and compliant data management. This hub simplifies the research data lifecycle, from initial planning to long-term archiving.

🌐 Live Site
Visit the site: https://meet2197.github.io/PoL_Datamgmt-hub/ 

# ✨ Features
RESTful API: A Python Flask back end with a RESTful API for managing data.

Database Integration: Uses a lightweight SQLite database for data persistence.

Data Models: Records are stored with a title, description, category, and creation timestamp.

Efficient Searching: The back end includes a /api/data/search endpoint that supports searching and pagination, allowing for efficient querying of large datasets.

Dynamic Front End: The front end fetches data from the back end and dynamically renders it with a responsive user interface.

Pagination: The front end includes pagination controls to navigate through search results effectively.

# ⚙️ Prerequisites
To run this project, you will need:

Python 3.8+

pip (Python package manager)

Node.js and npm (for front-end dependencies if any are added, though not strictly required for the current version)

# 🌐 Running Locally

Installation and Setup
Back End
Clone the repository:

```bash
git clone https://github.com/Meet2197/PoL_Datamgmt-hub
cd PoL_Datamgmt-hub
```

# Create and activate a virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate
```

Install back-end dependencies:
```bash
pip install Flask Flask-Cors
```

Run the back-end server:
```bash
python3 app/venv/app.py
```

The server will start on ```http://127.0.0.1:5000```

## Front End

The front-end code is self-contained in a single ```bash data-hub.html``` file. You can simply open this file in a modern web browser to run the application, as it fetches data directly from the running back-end server


# 🤝 Contribution
If you are a member of the PoL team and would like to contribute to the content or suggest improvements, please contact the repository owner or submit a pull request.

# 📄 License
MIT License © 2025 