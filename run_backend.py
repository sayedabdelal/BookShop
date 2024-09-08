#!/usr/bin/env python3

import sys
from backend import create_app
from backend.models.book import load_book_data

app = create_app()

def main():
    if len(sys.argv) > 1 and sys.argv[1] == 'load':
        load_book_data()
    else:
        app.run(debug=True)

if __name__ == '__main__':
    main()
