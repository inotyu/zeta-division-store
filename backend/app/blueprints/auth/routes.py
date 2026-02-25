from flask import Blueprint, request, jsonify
from .services import create_user, authenticate_user, get_user_by_id, get_user_by_email
from ...models import User
import jwt
from datetime import datetime, timedelta

# Importar o blueprint do __init__.py
from . import auth_bp

SECRET_KEY = 'zeta-division-secret-key-2024'

@auth_bp.route('/api/auth/register', methods=['POST'])
def register():
    """Endpoint de registro de novo usuário"""
    try:
        data = request.get_json()
        
        # Validação básica
        if not data or not data.get('email') or not data.get('password') or not data.get('name'):
            return jsonify({'error': 'Todos os campos são obrigatórios'}), 400
        
        name = data.get('name').strip()
        email = data.get('email').strip().lower()
        password = data.get('password')
        confirm_password = data.get('confirmPassword')
        
        # Validação: nome não pode estar vazio
        if not name or len(name) < 2:
            return jsonify({'error': 'Nome deve ter pelo menos 2 caracteres'}), 400
        
        # Validação: email válido
        import re
        email_pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
        if not re.match(email_pattern, email):
            return jsonify({'error': 'Formato de email inválido'}), 400
        
        # Validação: senha não pode estar vazia
        if not password or len(password) < 6:
            return jsonify({'error': 'Senha deve ter pelo menos 6 caracteres'}), 400
        
        # Validação: senhas devem ser iguais
        if password != confirm_password:
            return jsonify({'error': 'As senhas não coincidem'}), 400
        
        # Verificar se usuário já existe
        if get_user_by_email(email):
            return jsonify({'error': 'Já existe um usuário com este email'}), 400
        
        # Criar usuário
        user = create_user(name, email, password)
        
        return jsonify({
            'message': 'Usuário criado com sucesso!',
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/api/auth/login', methods=['POST'])
def login():
    """Endpoint de login"""
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email e senha são obrigatórios'}), 400
        
        email = data.get('email').strip().lower()
        password = data.get('password')
        
        # Validação: email válido
        import re
        email_pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
        if not re.match(email_pattern, email):
            return jsonify({'error': 'Formato de email inválido'}), 400
        
        # Verificar se conta existe
        user = get_user_by_email(email)
        if not user:
            return jsonify({'error': 'Conta não encontrada no sistema'}), 401
        
        # Autenticar usuário
        authenticated_user = authenticate_user(email, password)
        
        if not authenticated_user:
            return jsonify({'error': 'Email ou senha incorretos'}), 401
        
        # Gerar token JWT
        token = jwt.encode({
            'user_id': authenticated_user.id,
            'email': authenticated_user.email,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }, SECRET_KEY, algorithm='HS256')
        
        return jsonify({
            'message': 'Login realizado com sucesso!',
            'token': token,
            'user': authenticated_user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/api/auth/me', methods=['GET'])
def get_current_user():
    """Endpoint para obter dados do usuário logado"""
    try:
        # Aqui você implementaria validação de token
        # Por enquanto, retorna usuário mock
        return jsonify({
            'user': {
                'id': 1,
                'email': 'usuario@exemplo.com',
                'name': 'Usuário Zeta Division'
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
