import { useListExpensives } from '@/hooks/use-list-expensives';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { BadgeCheck, BadgeAlert, BadgeX, PenBoxIcon, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export interface Despesa {
  _id: string;
  nome: string;
  status: number;
  mensal: boolean;
  vencimento: number;
  categoria: string;
  valor: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const ListExpensives = () => {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const dataCompleta = new Date();
  const dia = dataCompleta.getDate();

  const { mutate: ListarDespesas } = useListExpensives();

  useEffect(() => {
    ListarDespesas(undefined, {
      onSuccess: (data) => {
        setDespesas(data.expensives);
        console.log(data.expensives);
      },
    });
  }, []);

  return (
    <div className="col-span-2 h-[400px] overflow-y-auto">
      <h2 className="font-bold text-2xl mb-4">Despesas Mensais</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {despesas.map((despesa) => (
            <TableRow key={despesa._id}>
              <TableCell className="font-medium">{despesa.nome}</TableCell>
              <TableCell>
                {despesa.status === 1 ? (
                  <Badge className="bg-green-400 text-black">
                    <BadgeCheck />
                  </Badge>
                ) : despesa.mensal ? (
                  dia <= despesa.vencimento ? (
                    <Badge className="bg-yellow-400 text-black">
                      <BadgeAlert />
                    </Badge>
                  ) : (
                    <Badge className="bg-red-400 text-black">
                      <BadgeX />
                    </Badge>
                  )
                ) : (
                  <Badge className="bg-red-400 text-black">
                    <BadgeX />
                  </Badge>
                )}
              </TableCell>
              <TableCell className="pl-10">{String(despesa.vencimento).padStart(2, '0')}</TableCell>
              <TableCell>{despesa.categoria}</TableCell>
              <TableCell>R$ {despesa.valor.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Button title="Editar Item" className="cursor-pointer">
                    <PenBoxIcon />
                  </Button>
                  <Button
                    variant="destructive"
                    className="cursor-pointer"
                    title="Deletar Transferência"
                  >
                    <Trash2 />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {despesas.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Nenhuma despesa encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
// <p>Ola</p>
