import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function loginUser(data: { email: string; senha: string }) {
  const response = await axios.post('http://localhost:3333/login', data, { withCredentials: true });
  return response.data;
}

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  });
}
