from ...models.user import User

# Mock de usuários para teste
mock_users = {}

def get_user_by_email(email):
    """Busca usuário pelo email"""
    return mock_users.get(email.lower())

def create_user(name, email, password):
    """Cria um novo usuário no banco"""
    email = email.lower()
    
    if email in mock_users:
        return None
    
    user = User()
    user.id = len(mock_users) + 1
    user.name = name
    user.email = email
    user.set_password(password)
    
    mock_users[email] = user
    
    return user

def authenticate_user(email, password):
    """Autentica usuário com email e senha"""
    email = email.lower()
    user = get_user_by_email(email)
    
    if not user:
        return None
    
    # Verificar senha
    if user.check_password(password):
        return user
    
    return None

def get_user_by_id(user_id):
    """Busca usuário pelo ID"""
    # Aqui você buscaria no banco
    # return User.query.get(user_id)
    
    # Mock para teste - procurar nos usuários mockados
    for user in mock_users.values():
        if user.id == user_id:
            return user
            
    return None
