import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Btn from '../UI/Button';

export default function RegisterForm({ onToggleMode }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Auto-login após registro
        login(data.user, data.token);
        window.location.href = '/';
      } else {
        setError(data.error || 'Erro ao criar conta');
      }
    } catch (err) {
      console.error('Erro no registro:', err);
      setError(err.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      {error && (
        <div style={{
          background: '#dc2626',
          color: '#ffffff',
          padding: '12px 16px',
          borderRadius: 'var(--r)',
          marginBottom: 16,
          fontSize: 14,
          fontFamily: 'var(--fb)',
          fontWeight: 500,
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: 16 }}>
        <label style={{ 
          display: 'block', 
          marginBottom: 8, 
          fontFamily: 'var(--fb)', 
          fontSize: 12, 
          fontWeight: 600, 
          letterSpacing: '0.1em', 
          textTransform: 'uppercase', 
          color: 'var(--tx)' 
        }}>
          Nome Completo
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid var(--brl)',
            borderRadius: 'var(--r)',
            fontSize: 14,
            fontFamily: 'var(--fb)',
            background: 'var(--bg)',
            color: 'var(--tx)',
            transition: 'all var(--tr)'
          }}
          required
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ 
          display: 'block', 
          marginBottom: 8, 
          fontFamily: 'var(--fb)', 
          fontSize: 12, 
          fontWeight: 600, 
          letterSpacing: '0.1em', 
          textTransform: 'uppercase', 
          color: 'var(--tx)' 
        }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid var(--brl)',
            borderRadius: 'var(--r)',
            fontSize: 14,
            fontFamily: 'var(--fb)',
            background: 'var(--bg)',
            color: 'var(--tx)',
            transition: 'all var(--tr)'
          }}
          required
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ 
          display: 'block', 
          marginBottom: 8, 
          fontFamily: 'var(--fb)', 
          fontSize: 12, 
          fontWeight: 600, 
          letterSpacing: '0.1em', 
          textTransform: 'uppercase', 
          color: 'var(--tx)' 
        }}>
          Senha
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid var(--brl)',
            borderRadius: 'var(--r)',
            fontSize: 14,
            fontFamily: 'var(--fb)',
            background: 'var(--bg)',
            color: 'var(--tx)',
            transition: 'all var(--tr)'
          }}
          required
        />
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ 
          display: 'block', 
          marginBottom: 8, 
          fontFamily: 'var(--fb)', 
          fontSize: 12, 
          fontWeight: 600, 
          letterSpacing: '0.1em', 
          textTransform: 'uppercase', 
          color: 'var(--tx)' 
        }}>
          Confirmar Senha
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••"
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid var(--brl)',
            borderRadius: 'var(--r)',
            fontSize: 14,
            fontFamily: 'var(--fb)',
            background: 'var(--bg)',
            color: 'var(--tx)',
            transition: 'all var(--tr)'
          }}
          required
        />
      </div>

      <Btn 
        variant="primary" 
        size="lg" 
        full 
        type="submit"
        disabled={loading}
        style={{ 
          marginTop: 8,
          background: '#ffffff',
          color: '#1a1a1a',
          border: '1px solid #e0e0e0'
        }}
      >
        {loading ? 'Criando conta...' : 'Criar Conta'}
      </Btn>

      <div style={{ 
        textAlign: 'center', 
        marginTop: 24, 
        fontSize: 13, 
        color: 'var(--txm)' 
      }}>
        Já tem conta?{' '}
        <button
          type="button"
          onClick={onToggleMode}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--ac)',
            fontFamily: 'var(--fb)',
            fontWeight: 600,
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Faça login
        </button>
      </div>
    </form>
  );
}
