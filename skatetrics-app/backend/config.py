import pathlib

SEARCH_ROOT = pathlib.Path(__file__).resolve().parent.parent
DATABASE_FILENAME = SEARCH_ROOT/'var'/'backend.sqlite3'