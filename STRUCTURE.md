# 📁 Estrutura de Pastas - Guia de Organização

Este guia explica como criar novas features mantendo o projeto organizado tanto no frontend quanto no backend.

---

## 🎯 **Regra de Ouro: Cada Feature = Pasta Nova**

Sempre que for criar algo novo (produto, carrinho, usuário, etc), crie uma estrutura de pastas organizada.

---

## 🚀 **Frontend - Nova Feature**

### **Exemplo 1: Sistema de Login**
```
frontend/src/
├── components/
│   ├── auth/                    # 🆕 Pasta nova para autenticação
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── PasswordReset.jsx
│   │   └── index.js              # Export centralizado
│   ├── user/                     # 🆕 Pasta nova para usuário
│   │   ├── UserProfile.jsx
│   │   ├── UserSettings.jsx
│   │   ├── UserOrders.jsx
│   │   └── index.js
│   └── layout/
│       └── ProtectedRoute.jsx     # 🆕 Rota protegida
├── contexts/
│   └── AuthContext.jsx           # 🆕 Context de autenticação
├── hooks/                       # 🆕 Pasta para hooks customizados
│   ├── useAuth.js
│   └── useLocalStorage.js
├── services/                    # 🆕 Pasta para API services
│   ├── authService.js
│   └── userService.js
└── utils/
    └── authUtils.js              # 🆕 Utilitários de auth
```

### **Exemplo 2: Sistema de Produtos Completo**
```
frontend/src/
├── components/
│   ├── product/                  # 🆕 Pasta para produtos
│   │   ├── ProductList.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductFilter.jsx
│   │   ├── ProductSearch.jsx
│   │   └── index.js
│   ├── admin/                   # 🆕 Pasta para admin
│   │   ├── ProductForm.jsx
│   │   ├── ProductEdit.jsx
│   │   ├── ProductUpload.jsx
│   │   └── index.js
│   └── forms/                   # 🆕 Pasta para formulários
│       ├── ProductForm.jsx
│       ├── CategoryForm.jsx
│       └── index.js
├── contexts/
│   └── ProductContext.jsx        # 🆕 Context de produtos
├── services/
│   ├── productService.js        # 🆕 Service de produtos
│   └── adminService.js         # 🆕 Service de admin
└── utils/
    ├── productUtils.js          # 🆕 Utilitários de produtos
    └── formatters.js           # 🆕 Formatação de dados
```

---

## 🐍 **Backend - Nova Feature**

### **Exemplo 1: Sistema de Usuários**
```
backend/app/
├── models/                      # 🆕 Pasta para modelos de dados
│   ├── __init__.py
│   ├── user.py                 # 🆕 Modelo User
│   └── profile.py              # 🆕 Modelo Profile
├── blueprints/
│   ├── auth/                   # 🆕 Blueprint de autenticação
│   │   ├── __init__.py
│   │   ├── routes.py           # 🆕 Rotas de auth
│   │   └── services.py        # 🆕 Lógica de negócio
│   └── users/                  # 🆕 Blueprint de usuários
│       ├── __init__.py
│       ├── routes.py           # 🆕 Rotas de usuários
│       └── services.py        # 🆕 Lógica de negócio
├── services/                    # 🆕 Pasta de serviços gerais
│   ├── __init__.py
│   ├── auth_service.py        # 🆕 Serviço de autenticação
│   └── email_service.py      # 🆕 Serviço de email
└── utils/
    ├── __init__.py
    ├── decorators.py          # 🆕 Decoradores (login_required)
    └── validators.py         # 🆕 Validadores de dados
```

### **Exemplo 2: Sistema de Produtos Completo**
```
backend/app/
├── models/
│   ├── product.py             # 🆕 Modelo Product
│   ├── category.py            # 🆕 Modelo Category
│   └── inventory.py          # 🆕 Modelo Inventory
├── blueprints/
│   ├── products/              # 🆕 Blueprint de produtos
│   │   ├── __init__.py
│   │   ├── routes.py         # 🆕 CRUD de produtos
│   │   └── services.py      # 🆕 Lógica de produtos
│   └── admin/                # 🆕 Blueprint admin
│       ├── __init__.py
│       ├── routes.py         # 🆕 Rotas admin
│       └── services.py      # 🆕 Lógica admin
├── services/
│   ├── product_service.py    # 🆕 Serviço de produtos
│   └── upload_service.py    # 🆕 Serviço de upload
└── utils/
    ├── upload.py             # 🆕 Utilitários de upload
    └── validators.py        # 🆕 Validadores de produtos
```

---

## 📝 **Como Criar Nova Feature - Passo a Passo**

### **Frontend:**
```bash
# 1. Criar estrutura de pastas
mkdir -p frontend/src/components/nova-feature
mkdir -p frontend/src/contexts
mkdir -p frontend/src/services
mkdir -p frontend/src/utils

# 2. Criar arquivos principais
touch frontend/src/components/nova-feature/index.js
touch frontend/src/components/nova-feature/ComponentePrincipal.jsx
touch frontend/src/contexts/NovaFeatureContext.jsx
touch frontend/src/services/novaFeatureService.js
touch frontend/src/utils/novaFeatureUtils.js

# 3. Configurar exports (exemplo index.js)
export { default as ComponentePrincipal } from './ComponentePrincipal.jsx';
export { default as ComponenteSecundario } from './ComponenteSecundario.jsx';
```

### **Backend:**
```bash
# 1. Criar estrutura de pastas
mkdir -p backend/app/blueprints/nova-feature
mkdir -p backend/app/models
mkdir -p backend/app/services
mkdir -p backend/app/utils

# 2. Criar arquivos principais
touch backend/app/blueprints/nova-feature/__init__.py
touch backend/app/blueprints/nova-feature/routes.py
touch backend/app/blueprints/nova-feature/services.py
touch backend/app/models/nova_feature.py
touch backend/app/utils/nova_feature_utils.py

# 3. Configurar blueprint (exemplo __init__.py)
from flask import Blueprint
from .routes import nova_feature_bp

nova_feature_bp = Blueprint('nova_feature', __name__)
```

---

## 🎯 **Padrões de Nomenclatura**

### **Frontend:**
- **Pastas**: `kebab-case` (ex: `user-profile`, `shopping-cart`)
- **Componentes**: `PascalCase` (ex: `UserProfile.jsx`, `ShoppingCart.jsx`)
- **Contexts**: `PascalCase + Context` (ex: `AuthContext.jsx`)
- **Services**: `camelCase + Service` (ex: `authService.js`)
- **Utils**: `camelCase + Utils` (ex: `authUtils.js`)

### **Backend:**
- **Pastas**: `snake_case` (ex: `user_management`, `product_catalog`)
- **Blueprints**: `snake_case` (ex: `user_management.py`)
- **Models**: `PascalCase` (ex: `User.py`, `Product.py`)
- **Services**: `snake_case` (ex: `user_service.py`)

---

## 🔄 **Integração com App Principal**

### **Frontend - Atualizar App.jsx:**
```jsx
import NovaFeatureContext from './contexts/NovaFeatureContext';
import ComponentePrincipal from './components/nova-feature';

function App() {
  return (
    <NovaFeatureContext.Provider>
      {/* ... outros componentes */}
      <ComponentePrincipal />
    </NovaFeatureContext.Provider>
  );
}
```

### **Backend - Atualizar __init__.py:**
```python
from app.blueprints.nova_feature import nova_feature_bp

def create_app():
    app = Flask(__name__)
    
    # Registrar novo blueprint
    app.register_blueprint(nova_feature_bp, url_prefix='/api/nova-feature')
    
    return app
```

---

## 📋 **Checklist Antes de Commitar**

### **Frontend:**
- [ ] Pasta da feature criada com estrutura correta
- [ ] Components exportados via index.js
- [ ] Context configurado com Provider
- [ ] Services com tratamento de erros
- [ ] Utils com funções reutilizáveis
- [ ] Importações atualizadas no App.jsx

### **Backend:**
- [ ] Blueprint criado com __init__.py
- [ ] Models com SQLAlchemy (se aplicável)
- [ ] Services com lógica separada das rotas
- [ ] Blueprint registrado no app principal
- [ ] Endpoints com validação

---

## 🎮 **Exemplos Práticos - Zeta Division**

### **1. Sistema de Team Jerseys:**
```
frontend/src/components/team-jerseys/
├── JerseyCustomizer.jsx    # Customizador de jersey
├── TeamSelector.jsx        # Seletor de times
├── PlayerNameInput.jsx     # Input nome jogador
└── index.js

backend/app/blueprints/team_jerseys/
├── routes.py              # POST /api/team-jerseys/customize
├── services.py           # Lógica de customização
└── models/team_jersey.py  # Modelo TeamJersey
```

### **2. Sistema de Avaliações:**
```
frontend/src/components/reviews/
├── ReviewList.jsx         # Lista de avaliações
├── ReviewForm.jsx         # Formulário de avaliação
├── RatingStars.jsx        # Componente de estrelas
└── index.js

backend/app/blueprints/reviews/
├── routes.py              # GET/POST /api/reviews
├── services.py           # Lógica de avaliações
└── models/review.py       # Modelo Review
```

---

## 🚨 **Regras Importantes**

### **✅ SEMPRE FAÇA:**
- Criar pasta específica para cada feature
- Separar componentes por responsabilidade
- Usar arquivos index.js para exports centralizados
- Manter lógica de negócio em services
- Documentar funções complexas

### **❌ NUNCA FAÇA:**
- Misturar features diferentes na mesma pasta
- Criar componentes gigantes (monolíticos)
- Esquecer de registrar blueprints no backend
- Deixar imports desorganizados

---

**Lembre-se: Estrutura organizada = Código feliz! 🎉**
