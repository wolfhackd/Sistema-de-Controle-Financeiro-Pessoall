import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function loginUser(data: { email: string; senha: string }) {
  const response = await axios.post('/api/login', data);
  return response.data; // Deve conter tokens e informações do usuário
}

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  });
}
