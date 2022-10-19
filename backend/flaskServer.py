
from flask import Flask, request

app = Flask(__name__, static_folder='../build',  static_url_path='/')

@app.route('/')
def homePage():
    return app.send_static_file('index.html')