import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [accessKey, setAccessKey] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const storedKey = localStorage.getItem('accessKey');
      
      if (!storedKey) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessKey: storedKey }),
        });

        if (response.ok) {
          setIsAuthenticated(true);
          setAccessKey(storedKey);
        } else {
          // Invalid key, remove from storage
          localStorage.removeItem('accessKey');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('accessKey');
    setIsAuthenticated(false);
    setAccessKey(null);
    window.location.href = '/login';
  };

  return {
    isAuthenticated,
    isLoading,
    accessKey,
    logout,
  };
}