import { useState, useEffect, useCallback } from 'react';

// Hook de cache simples com localStorage
export const useCache = (key, fetcher, ttl = 300000) => { // 5 minutos padrão
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const cached = localStorage.getItem(key);
    const timestamp = localStorage.getItem(`${key}_timestamp`);
    
    if (cached && timestamp) {
      const age = Date.now() - parseInt(timestamp);
      if (age < ttl) {
        try {
          setData(JSON.parse(cached));
          return;
        } catch (e) {
          console.error('Erro ao parsear cache:', e);
          localStorage.removeItem(key);
          localStorage.removeItem(`${key}_timestamp`);
        }
      }
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await fetcher();
      setData(result);
      localStorage.setItem(key, JSON.stringify(result));
      localStorage.setItem(`${key}_timestamp`, Date.now().toString());
    } catch (err) {
      setError(err.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, ttl]);

  // Limpar cache
  const clearCache = useCallback(() => {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_timestamp`);
    setData(null);
    setError(null);
  }, [key]);

  // Refetch manual
  const refetch = useCallback(() => {
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_timestamp`);
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch, clearCache };
};
