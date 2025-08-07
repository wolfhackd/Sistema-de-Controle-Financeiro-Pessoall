import type { DeleteExpensiveForm } from '@/components/dashboard/ListExpensives';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function DeleteExpensive(data: DeleteExpensiveForm) {
  const response = await axios.post('http://localhost:3333/deleteExpensive', data, {
    withCredentials: true,
  });
  return response.data;
}

export function useDeleteExpensive() {
  return useMutation({
    mutationFn: DeleteExpensive,
  });
}
