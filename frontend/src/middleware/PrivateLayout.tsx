import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../lib/axios';

export function PrivateLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await api.get('/me');
        setIsAuth(true);
      } catch (error) {
        try {
          await api.get('/refresh');
          setIsAuth(true);
        } catch {
          setIsAuth(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) return <div>Carregando...</div>;

  if (!isAuth) return <Navigate to="/" replace />;

  // Aqui ele renderiza a rota que foi pedida no endereço,
  // tipo /dashboard, /perfil, /qualquer-rota-protegida
  return <Outlet />;
}
