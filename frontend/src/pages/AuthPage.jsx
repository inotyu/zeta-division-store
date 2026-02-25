import { useState, useEffect } from 'react';
import { LoginForm, RegisterForm } from '../components/auth';
import './auth.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // Resetar scroll ao entrar na página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-background" />
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">
            {isLogin ? 'Bem-vindo de volta!' : 'Junte-se à Zeta Division'}
          </h1>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Entre para acessar sua conta e continuar comprando'
              : 'Crie sua conta e exclusivas do time'
            }
          </p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Entrar
          </button>
          <button 
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Cadastrar
          </button>
        </div>

        <div className="auth-form-container">
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleMode={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
