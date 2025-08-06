import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

async function ListExpensives() {
  const result = await axios.post(
    'http://localhost:3333/listExpensive',
    {},
    { withCredentials: true },
  );
  return result.data;
}

export function useListExpensives() {
  return useMutation({
    mutationFn: ListExpensives,
  });
}
