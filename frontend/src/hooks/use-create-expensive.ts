import type { despesaFormType } from '@/components/create-expensive-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function createExpensive(data: despesaFormType) {
  const response = await axios.post('http://localhost:3333/createExpensive', data, {
    withCredentials: true,
  });
  return response.data;
}

export function usecreateExpensive() {
  return useMutation({
    mutationFn: createExpensive,
  });
}
