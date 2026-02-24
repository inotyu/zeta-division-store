from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Importar e registrar blueprints
    from app.blueprints.frontend import frontend_bp
    app.register_blueprint(frontend_bp)
    
    return app
