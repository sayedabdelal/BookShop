#!/usr/bin/env python3

import sys
from backend import create_app
from backend.models.book import load_book_data

"""
Script to run the Flask application or load initial book data.

Usage:
- `python run_backend.py`: Runs the Flask application in debug mode.
- `python run_backend.py load`: Loads initial book data into the database.

Dependencies:
- `sys`: For command-line argument parsing.
- `backend`: For creating the Flask application and loading book data.

Functions:
- `main() -> None`: Main function to handle command-line arguments and run the application.

    Command-line Arguments:
    - `load`: If provided, the script will execute `load_book_data()` to load book data into the database.
    - Otherwise, it will run the Flask application.

If executed as the main module, `main()` is called to determine the appropriate action.
"""

app = create_app()

def main():
    if len(sys.argv) > 1 and sys.argv[1] == 'load':
        load_book_data()
    else:
        app.run(debug=True)

if __name__ == '__main__':
    main()
