from flask import Flask
from flask_cors import CORS
from .models import User

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Importar e registrar blueprints
    from app.blueprints.frontend import frontend_bp
    from app.blueprints.auth import auth_bp
    app.register_blueprint(frontend_bp)
    app.register_blueprint(auth_bp)
    
    return app
