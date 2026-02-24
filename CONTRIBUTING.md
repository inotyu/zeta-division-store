# 🤝 Guia de Contribuição - Zeta Division Store

Olá! Este guia explica passo a passo como contribuir com o projeto Zeta Division Store. Siga estas regras para manter nosso código organizado e evitar conflitos.

---

## 🎯 **Regra de Ouro: NUNCA CODAR DIRETO NA MAIN!**

Sempre, sempre, **SEMPRE** trabalhe em uma branch nova. A branch `main` deve permanecer limpa e estável.

---

## 🔄 **Workflow Completo de Contribuição**

### **Passo 1: Antes de Começar a Codar**

#### **1.1. Atualize seu repositório local**
```bash
# Entre na pasta do projeto
cd zeta-division-store

# Baixe as últimas alterações do repositório remoto
git pull origin main
```

#### **1.2. Verifique se está na branch main**
```bash
git branch
# Deve mostrar *main com asterisco
```

#### **1.3. Verifique se não há alterações pendentes**
```bash
git status
# Deve mostrar: "nothing to commit, working tree clean"
```

---

### **Passo 2: Criar sua Branch de Trabalho**

#### **2.1. Crie uma nova branch**
```bash
# Formato: feature/nome-da-feature ou bugfix/nome-do-bug
git checkout -b feature/nome-da-sua-feature

# Exemplos:
git checkout -b feature/login-system
git checkout -b feature/product-search
git checkout -b bugfix/header-overlay
git checkout -b feature/payment-integration
```

#### **2.2. Verifique se está na branch correta**
```bash
git branch
# Deve mostrar sua nova feature com asterisco *
```

---

### **Passo 3: Desenvolvimento**

#### **3.1. Faça suas alterações**
- Codifique sua feature
- Teste localmente
- Não esqueça de testar tanto frontend quanto backend

#### **3.2. Verifique o que você alterou**
```bash
git status
git diff  # Para ver as alterações detalhadas
```

---

### **Passo 4: Commit das Alterações**

#### **4.1. Adicione os arquivos alterados**
```bash
# Adiciona todos os arquivos modificados
git add .

# Ou adicione arquivos específicos
git add src/components/Header.jsx
git add backend/app/blueprints/frontend.py
```

#### **4.2. Faça o commit com mensagem clara**
```bash
# Formato: tipo: descrição curta e explicativa
git commit -m "feat: add login system with email authentication

- Implement JWT authentication
- Add login/logout components
- Create user profile page
- Fix header overlay issue on mobile"

# Tipos de commit:
# feat: nova feature
# fix: bug fix
# docs: documentação
# style: formatação/código
# refactor: refatoração
# test: testes
# chore: manutenção
```

---

### **Passo 5: Manter sua Branch Atualizada**

#### **5.1. Antes de fazer push, atualize com a main**
```bash
# Volte para a branch main
git checkout main

# Baixe as últimas alterações
git pull origin main

# Volte para sua branch
git checkout feature/nome-da-sua-feature

# Mescle as alterações da main na sua branch
git merge main

# Se houver conflitos, resolva-os manualmente
# Depois de resolver conflitos:
git add .
git commit -m "merge: update with latest main changes"
```

---

### **Passo 6: Push da sua Branch**

#### **6.1. Envie sua branch para o repositório remoto**
```bash
git push origin feature/nome-da-sua-feature
```

#### **6.2. Se for primeira vez na branch**
```bash
git push -u origin feature/nome-da-sua-feature
```

---

### **Passo 7: Pull Request**

#### **7.1. Abra um Pull Request no GitHub**
- Acesse: https://github.com/inotyu/zeta-division-store
- Clique em **"Compare & pull request"**
- Selecione sua branch
- Preencha o título do PR
- Descreva suas alterações
- Clique em **"Create pull request"**

#### **7.2. Formato do Pull Request**
```markdown
## 📝 Descrição
Breve descrição do que foi implementado.

## 🔄 Changes
- [ ] Feature X implementada
- [ ] Bug Y corrigido
- [ ] Teste Z adicionado

## 🧪 Testes
- [ ] Testado manualmente no frontend
- [ ] Testado manualmente no backend
- [ ] Funciona em mobile e desktop

## 📸 Screenshots
(Se aplicável, adicione screenshots)

## 🔗 Issues Relacionados
Closes #numero-do-issue
```

---

## 🚨 **Regras Importantes**

### **❌ NUNCA FAÇA ISSO:**
- ❌ Codar diretamente na branch `main`
- ❌ Fazer push direto para `main`
- ❌ Ignorar conflitos de merge
- ❌ Fazer commit sem mensagem descritiva
- ❌ Esquecer de testar antes de commitar

### **✅ SEMPRE FAÇA ISSO:**
- ✅ Trabalhar em branch separada
- ✅ Manter `main` sempre atualizada
- ✅ Testar suas alterações
- ✅ Fazer commits com mensagens claras
- ✅ Resolver conflitos imediatamente
- ✅ Documentar mudanças importantes

---

## 🔄 **Comandos do Dia a Dia**

### **Início do dia:**
```bash
cd zeta-division-store
git pull origin main
git checkout -b feature/nova-feature
```

### **Durante o desenvolvimento:**
```bash
git add .
git commit -m "feat: implementando nova feature"
git push origin feature/nova-feature
```

### **Antes de fazer PR:**
```bash
git checkout main
git pull origin main
git checkout feature/nova-feature
git merge main
git push origin feature/nova-feature
```

---

## 🐛 **Resolvendo Conflitos**

### **Se ocorrer conflito no merge:**
```bash
# 1. Veja os arquivos em conflito
git status

# 2. Abra os arquivos e resolva os conflitos manualmente
# Procure por: <<<<<<< HEAD, =======, >>>>>>> feature/nome

# 3. Depois de resolver:
git add .
git commit -m "merge: resolve conflicts with main"
```

---

## 📱 **Testes Obrigatórios**

Antes de abrir PR, verifique:

### **Frontend:**
- [ ] Aplicação abre sem erros
- [ ] Header funciona corretamente
- [ ] Carrinho de compras funciona
- [ ] Responsividade mobile/desktop
- [ ] Não há erros no console do browser

### **Backend:**
- [ ] API inicia sem erros
- [ ] Endpoints respondem corretamente
- [ ] CORS funciona
- [ ] Logs não mostram erros

---

## 🎯 **Exemplo Completo de Workflow**

```bash
# 1. Início do dia
cd zeta-division-store
git pull origin main

# 2. Criar branch para nova feature
git checkout -b feature/user-profile

# 3. Desenvolver (codar, testar, etc)
# ... horas de codificação ...

# 4. Commit das alterações
git add .
git commit -m "feat: add user profile page with avatar upload"

# 5. Manter branch atualizada
git checkout main
git pull origin main
git checkout feature/user-profile
git merge main

# 6. Push para repositório
git push origin feature/user-profile

# 7. Abrir Pull Request no GitHub
# https://github.com/inotyu/zeta-division-store/compare/main...feature/user-profile
```

---

## 📞 **Dúvidas?**

Se tiver dúvidas sobre o workflow:
- Abra uma **Issue** no GitHub
- Pergunte no grupo da equipe
- Revise este guia quantas vezes precisar

**Lembre-se: É melhor perguntar do que quebrar o projeto!** 🚀

---

**Feliz codificação! 🎉**
