import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function createAccount(data: {
  email: string;
  nome: string;
  senha: string;
  confirmarSenha: string;
}) {
  const response = await axios.post('http://localhost:3333/createAccount', data);
  return response.data;
}

export function useCreateAccount() {
  return useMutation({
    mutationFn: createAccount,
  });
}
