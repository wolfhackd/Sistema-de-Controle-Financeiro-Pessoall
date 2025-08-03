import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function logoutUser() {
  const response = await axios.post('http://localhost:3333/logout', {}, { withCredentials: true });
  return response.data;
}

export function useLogout() {
  return useMutation({
    mutationFn: logoutUser,
  });
}
