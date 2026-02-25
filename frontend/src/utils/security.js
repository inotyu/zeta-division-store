// Utilitários de segurança

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/[<>]/g, '') // Remove tags HTML
    .replace(/javascript:/gi, '') // Remove protocolos javascript
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 1000); // Limita tamanho
};

export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
};

export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') return false;
  
  // Mínimo 6 caracteres
  if (password.length < 6) return false;
  
  // Pelo menos uma letra maiúscula
  if (!/[A-Z]/.test(password)) return false;
  
  // Pelo menos um número
  if (!/\d/.test(password)) return false;
  
  return true;
};

export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

export const isValidURL = (url) => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};
