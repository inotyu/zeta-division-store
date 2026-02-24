from flask import Blueprint, jsonify
import os

frontend_bp = Blueprint('frontend', __name__)

@frontend_bp.route('/api/health')
def health_check():
    """Endpoint para verificação de saúde da API"""
    return jsonify({'status': 'ok', 'message': 'Zeta Division Store API is running'})

@frontend_bp.route('/api/produtos')
def get_produtos():
    """Endpoint para obter lista de produtos"""
    # Aqui você pode conectar com um banco de dados no futuro
    return jsonify({
        'produtos': [],
        'message': 'API endpoint para produtos - implementar lógica de negócio'
    })
