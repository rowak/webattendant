
from flask import Flask, request

app = Flask(__name__, static_url_path='')

@app.route('/')
def homePage():
    return "hello world"
