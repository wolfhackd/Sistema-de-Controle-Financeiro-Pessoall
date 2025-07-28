import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function createAccount(data: { email: string; senha: string; confirmarSenha: string }) {
  const response = await axios.post('/api/createAccount', data);
  return response.data; // Deve conter tokens e informações do usuário
}

export function useCreateAccount() {
  return useMutation({
    mutationFn: createAccount,
  });
}
