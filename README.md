# Zeta Division Store

🛍️ E-commerce moderno da Zeta Division - Marca de lifestyle gamer sediada em Tóquio, Japão.

## 📋 Visão Geral

Aplicação completa de e-commerce desenvolvida com React + Vite (frontend) e Flask (backend API), featuring design responsivo, carrinho de compras funcional e experiência de usuário premium.

---

## 🚀 Stack Tecnológico

### Frontend
- **React 18.2.0** - Biblioteca UI component-based
- **Vite 5.0.8** - Build tool ultra-rápido com HMR
- **CSS Variables** - Sistema de design themable
- **React Hooks** - useState, useEffect, useContext
- **Component Architecture** - Estrutura modular e reutilizável

### Backend
- **Flask 2.3.3** - Web framework Python
- **Flask-CORS 4.0.0** - Cross-Origin Resource Sharing
- **Blueprint Pattern** - Arquitetura modular
- **RESTful API** - Endpoints JSON

---

## 🗄️ Implementação do Banco de Dados

### Status Atual
O sistema atualmente utiliza **dados mockados em memória** para testes e desenvolvimento. Para produção, é necessário implementar um banco de dados real.

### 📊 Modelos de Dados

#### Usuário (`User`)
```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'is_active': self.is_active
        }
```

#### Produto (`Product`)
```python
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(500))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    stock_quantity = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    category = db.relationship('Category', backref='products')
```

#### Categoria (`Category`)
```python
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(500))
    is_active = db.Column(db.Boolean, default=True)
```

#### Pedido (`Order`)
```python
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='pending')
    shipping_address = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='orders')
    items = db.relationship('OrderItem', backref='order')
```

### 🔧 Configuração do Banco de Dados

#### 1. Instalar dependências
```bash
pip install flask-sqlalchemy alembic bcrypt
```

#### 2. Configurar SQLAlchemy + Alembic no Flask
```python
# app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from alembic import command
from alembic.config import Config
from alembic import op
import sqlalchemy as sa

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///zetadivision.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Configurar Alembic
alembic_cfg = Config("alembic.ini")
alembic_cfg.set_main_option("sqlalchemy.url", app.config['SQLALCHEMY_DATABASE_URI'])
```

#### 3. Inicializar Alembic
```bash
# Criar diretório de migrações
alembic init alembic

# Configurar alembic.ini (já criado pelo comando acima)
# Em alembic.ini, definir:
# sqlalchemy.url = sqlite:///zetadivision.db

# Criar primeira migração
alembic revision -m "Create user table"

# Executar migração
alembic upgrade head
```

#### 4. Exemplo de migração Alembic
```python
# alembic/versions/xxxxx_create_user_table.py
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table('user',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('email', sa.String(length=120), nullable=False),
        sa.Column('password_hash', sa.String(length=128), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )

def downgrade():
    op.drop_table('user')
```

#### 5. Comandos Alembic essenciais
```bash
# Criar nova migração
alembic revision -m "Add new table"

# Ver status das migrações
alembic current

# Aplicar migrações pendentes
alembic upgrade head

# Reverter última migração
alembic downgrade -1

# Ver histórico de migrações
alembic history

# Ver migrações pendentes
alembic check
```

### 🔄 Flask-Migrate vs Alembic

| Aspecto | Flask-Migrate | Alembic |
|---------|---------------|---------|
| **Integração** | Específico do Flask | SQLAlchemy puro |
| **Facilidade** | Mais simples | Mais controle |
| **Flexibilidade** | Limitada | Total controle |
| **Comandos** | `flask db <comando>` | `alembic <comando>` |
| **Migrações** | Auto-geradas | Manual/Assistida |

**Recomendação:** Use **Flask-Migrate** para projetos Flask simples, **Alembic** para controle avançado ou projetos SQLAlchemy puros.

#### 4. Atualizar services.py
```python
from app import db
from .models import User

def create_user(name, email, password):
    if User.query.filter_by(email=email).first():
        return None

    user = User(name=name, email=email)
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return user

def authenticate_user(email, password):
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return user
    return None

def get_user_by_email(email):
    return User.query.filter_by(email=email).first()
```

### 📁 Estrutura Final do Banco

```
ZetaDivision/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Configuração Flask + SQLAlchemy
│   │   ├── models/
│   │   │   ├── __init__.py      # Importa todos os modelos
│   │   │   ├── user.py          # Modelo User
│   │   │   ├── product.py       # Modelo Product
│   │   │   ├── category.py      # Modelo Category
│   │   │   └── order.py         # Modelo Order
│   │   └── blueprints/
│   │       ├── auth/
│   │       │   ├── routes.py    # Endpoints de auth
│   │       │   └── services.py  # Lógica de negócio
│   │       └── products/        # Endpoints de produtos
│   └── migrations/              # Migrations do Flask-Migrate
```

### 🚀 Próximos Passos

1. **Instalar dependências do banco**
2. **Criar modelos SQLAlchemy**
3. **Configurar Flask-Migrate**
4. **Migrar dados mockados para o banco**
5. **Atualizar serviços para usar banco real**
6. **Testar integração completa**

---

## 📋 Como Rodar o Projeto

### Backend (Flask)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

Acesse: `http://localhost:3000`

---

## 🎯 Funcionalidades Implementadas

- ✅ **Sistema de Autenticação** - Login/Cadastro com validações
- ✅ **Design Responsivo** - Mobile-first approach
- ✅ **Carrinho de Compras** - Funcional com localStorage
- ✅ **Navegação por Categorias** - Interface intuitiva
- ✅ **Experiência Premium** - Animações e transições suaves

---

## 📞 Suporte

Para dúvidas sobre implementação do banco de dados, consulte a documentação do SQLAlchemy e Flask-Migrate.
│   │   │   ├── ProductCard.jsx
│   │   │   └── CartDrawer.jsx
│   │   ├── contexts/           # React Context
│   │   │   └── CarrinhoContext.jsx
│   │   ├── utils/              # Utilitários
│   │   │   └── constants.js
│   │   ├── styles/             # Estilos globais
│   │   │   └── globals.css
│   │   ├── App.jsx             # Componente principal
│   │   └── main.jsx            # Ponto de entrada
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── backend/                     # API Flask
│   ├── app/
│   │   ├── __init__.py         # Factory pattern
│   │   └── blueprints/
│   │       ├── __init__.py
│   │       └── frontend.py     # Blueprint principal
│   ├── main.py                 # Ponto de entrada
│   ├── requirements.txt
│   └── venv/                   # Ambiente virtual
└── README.md
```

---

## 🛠️ Configuração do Ambiente

### Pré-requisitos
- **Node.js 18+** 
- **Python 3.8+**
- **npm** (geralmente vem com Node.js)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd ZetaDivision
   ```

2. **Configure o Backend (Flask)**
   
   **Linux/Mac:**
   ```bash
   cd backend
   
   # Criar ambiente virtual
   python -m venv venv
   
   # Ativar ambiente virtual
   source venv/bin/activate
   
   # Instalar dependências
   pip install -r requirements.txt
   ```
   
   **Windows:**
   ```bash
   cd backend
   
   # Criar ambiente virtual
   python -m venv venv
   
   # Ativar ambiente virtual
   venv\Scripts\activate
   
   # Instalar dependências
   pip install -r requirements.txt
   ```
   

3. **Configure o Frontend (React + Vite)**
   ```bash
   cd frontend
   
   # Instalar dependências
   npm install
   ```

---

## 🚀 Como Executar

### Método 1: Dois Terminais (Recomendado)

**Terminal 1 - Backend Flask:**
   
   **Linux/Mac:**
   ```bash
   cd backend
   source venv/bin/activate
   python main.py
   ```
   
   **Windows:**
   ```bash
   cd backend
   venv\Scripts\activate
   python main.py
   ```
   
📍 API rodando em: http://localhost:5000

**Terminal 2 - Frontend Vite:**
```bash
cd frontend
npm run dev
```
📍 Frontend rodando em: http://localhost:3000

### Método 2: Apenas Frontend (Para desenvolvimento rápido)

Se você só quer trabalhar no frontend:
```bash
cd frontend
npm run dev
```
O Vite já serve o React com proxy para o backend Flask.

---

## 📡 Endpoints da API

### Health Check
```http
GET /api/health
```
Response:
```json
{
  "status": "ok",
  "message": "Zeta Division Store API is running"
}
```

### Produtos
```http
GET /api/produtos
```
Response:
```json
{
  "produtos": [],
  "message": "API endpoint para produtos - implementar lógica de negócio"
}
```

---

## 🎨 Features Implementadas

### ✅ Frontend Features
- **Navegação SPA** entre páginas
- **Carrinho de Compras** funcional com React Context
- **Página de Produto** completa com:
  - Galerias de imagens
  - Seleção de tamanho
  - Seleção de jogador (quando aplicável)
  - Quantidade
  - Produtos relacionados
- **Design Responsivo** para mobile/tablet/desktop
- **Header Fixo** com menu mobile
- **Footer** completo com links
- **Animações** suaves e transições
- **Hot Reload** em desenvolvimento

### ✅ Backend Features
- **API RESTful** organizada com Blueprints
- **CORS** configurado para frontend
- **Factory Pattern** para escalabilidade
- **Health Check** endpoint
- **Estrutura modular** para novos endpoints

---

## 🎯 Sistema de Design

### Cores (Tema Claro)
```css
--bg: #ffffff;           /* Fundo principal */
--bg2: #f8f9fa;          /* Fundo secundário */
--tx: #1a1a1a;           /* Texto principal */
--txm: #666666;          /* Texto secundário */
--ac: #2563eb;           /* Cor de destaque (azul) */
--br: #e0e0e0;           /* Bordas */
```

### Tipografia
- **Fonte Display**: Bebas Neue
- **Fonte Body**: Rajdhani
- **Fonte Mono**: Space Mono

### Componentes UI
- **Buttons**: Primary, Ghost, Accent variants
- **Cards**: Product cards com hover effects
- **Forms**: Selectors e inputs customizados
- **Navigation**: Header fixo com menu mobile

---

## 🔧 Comandos Úteis

### Frontend
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
```

### Backend
```bash
python main.py    # Iniciar servidor Flask
pip freeze        # Ver dependências instaladas
```

---

## 📱 Responsividade

- **Mobile**: < 768px - Layout single column
- **Tablet**: 768px - 1024px - Layout adaptativo
- **Desktop**: > 1024px - Layout completo com grid

---

## 🔄 Fluxo de Navegação

1. **Página Inicial** → Hero section + produtos em destaque
2. **Catálogos** → Produtos filtrados por categoria
3. **Detalhe Produto** → Informações completas + carrinho
4. **Carrinho** → Drawer lateral com itens
5. **Footer** → Links e informações da loja

---

## 🚀 Deploy

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy da pasta /dist
```

### Backend (Heroku/Render)
```bash
# Configurar variáveis de ambiente
# Instalar dependências
# Executar: gunicorn main:app
```

---

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit suas mudanças: `git commit -m 'Add nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

---

## 🎯 Roadmap - Features Futuras

### � **Autenticação e Usuários**
- [ ] Sistema de Login/Cadastro (Email + Senha)
- [ ] Login Social (Google, GitHub)
- [ ] Recuperação de senha
- [ ] Perfil do usuário com histórico
- [ ] Endereços de entrega
- [ ] Wishlist/Favoritos

### 🛒 **E-commerce Completo**
- [ ] Checkout completo com múltiplos passos
- [ ] Integração com gateways de pagamento (Stripe, Mercado Pago)
- [ ] Cálculo de frete automático
- [ ] Cupons de desconto
- [ ] Histórico de pedidos
- [ ] Rastreamento de pedidos
- [ ] Sistema de avaliações de produtos
- [ ] Perguntas e respostas sobre produtos

### 💾 **Banco de Dados**
- [ ] PostgreSQL para produção
- [ ] Models SQLAlchemy para produtos
- [ ] Models para usuários, pedidos, carrinho
- [ ] Migrations com Alembic
- [ ] Seed data para produtos iniciais
- [ ] Backup automático do banco

### 🔍 **Funcionalidades de Busca**
- [ ] Barra de busca funcional
- [ ] Filtros avançados (preço, tamanho, cor)
- [ ] Busca por categoria com sugestões
- [ ] Ordenação (preço, popularidade, lançamentos)
- [ ] Busca por texto completo

### 📱 **Mobile e Performance**
- [ ] App mobile (React Native)
- [ ] PWA (Progressive Web App)
- [ ] Lazy loading de imagens
- [ ] Code splitting por rota
- [ ] Service Worker para cache
- [ ] Otimização SEO

### 🎨 **UI/UX Avançado**
- [ ] Sistema de temas (Dark/Light)
- [ ] Animações mais elaboradas
- [ ] Microinterações
- [ ] Loading skeletons
- [ ] Toast notifications
- [ ] Modal de confirmação
- [ ] Drag & drop no carrinho

### 📊 **Painel Administrativo**
- [ ] Dashboard de vendas
- [ ] Gerenciamento de produtos (CRUD)
- [ ] Controle de estoque
- [ ] Gestão de pedidos
- [ ] Relatórios e analytics
- [ ] Usuários administrativos

### 🔗 **Integrações Externas**
- [ ] API de pagamento (Stripe)
- [ ] API de frete (Correios, FedEx)
- [ ] Email marketing (Mailchimp)
- [ ] Analytics (Google Analytics)
- [ ] Chat de suporte (Intercom)
- [ ] Redes sociais (compartilhamento)

### 🌐 **Internacionalização**
- [ ] Multi-idioma (PT-BR, EN, JP)
- [ ] Moedas múltiplas (BRL, USD, JPY)
- [ ] Formatos de data localizados
- [ ] Configurações regionais

### 🚀 **Infraestrutura**
- [ ] Docker containerização
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Deploy automático (Vercel + Heroku)
- [ ] Monitoramento e logging
- [ ] CDN para assets
- [ ] Load balancing

### 🧪 **Qualidade**
- [ ] Testes unitários (Jest)
- [ ] Testes E2E (Cypress)
- [ ] Code coverage > 90%
- [ ] TypeScript migration
- [ ] ESLint + Prettier
- [ ] Pre-commit hooks

---

## 🎮 **Features Específicas Zeta Division**
- [ ] Sistema de "Team Jerseys" personalizados
- [ ] Gamificação com pontos e badges
- [ ] Integração com torneios de e-sports
- [ ] Lançamentos exclusivos para membros
- [ ] Sistema de pré-venda
- [ ] Conteúdo de criadores associados
- [ ] Eventos e lançamentos especiais

---

## 📈 **Métricas e Analytics**
- [ ] Google Analytics 4
- [ ] Hotjar para heatmaps
- [ ] Console do Google Search
- [ ] Meta Pixel para Facebook/Instagram
- [ **Eventos personalizados**:
  - Visualização de produtos
  - Adição ao carrinho
  - Início de checkout
  - Conversões

---

## 🔧 **Melhorias Técnicas**
- [ ] Migrar para TypeScript
- [ ] Implementar Redis para cache
- [ ] Fila de processamento (Celery)
- [ ] WebSockets para tempo real
- [ ] GraphQL para API
- [ ] Server-side rendering (Next.js)

---

## 🐛 Troubleshooting

### Problemas Comuns

**Header sobrepondo conteúdo:**
- O padding das páginas está configurado para `calc(48px + 100px)`
- Se necessário, ajuste o valor no componente específico

**CORS errors:**
- Verifique se o backend Flask está rodando na porta 5000
- O Vite está configurado com proxy para `/api` → `http://localhost:5000`

**Hot Reload não funcionando:**
- Reinicie o servidor de desenvolvimento: `npm run dev`
- Verifique se não há erros de sintaxe no código

---

## 📄 Licença

MIT License - Copyright © 2024 Zeta Division

---

## 📞 Contato

- **Frontend**: React + Vite + CSS-in-JS
- **Backend**: Flask + Python
- **Design**: Sistema próprio baseado em CSS Variables
