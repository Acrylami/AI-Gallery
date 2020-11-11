from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__, static_folder="../build/static", template_folder="../build")
app.config['SECRET_KEY'] = os.environ.get('FLASK_KEY')
CORS(app)

from main import routes
