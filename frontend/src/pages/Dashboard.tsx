import { GraficoLinha } from '@/components/dashboard/LineChart';
import { Navbar } from '@/components/dashboard/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BadgeAlert, BadgeCheck, BadgeX, PenBoxIcon, Trash2 } from 'lucide-react';

//badges para usar
// badge - alert;
// badge - check;
// badge - x;

// Adicionar sessão de despesas automaticas mensais

// Tabela de dados anual
// type DadosDoAno = {
//   label: string;
//   value: number;
// };

// const year: DadosDoAno[] = [
//   { label: 'Janeiro', value: 1500 },
//   { label: 'Fevereiro', value: 1200 },
//   { label: 'Março', value: 1350 },
//   { label: 'Abril', value: 1600 },
//   { label: 'Maio', value: 1450 },
//   { label: 'Junho', value: 1700 },
//   { label: 'Julho', value: 1550 },
//   { label: 'Agosto', value: 1650 },
//   { label: 'Setembro', value: 1400 },
//   { label: 'Outubro', value: 1750 },
//   { label: 'Novembro', value: 1600 },
//   { label: 'Dezembro', value: 1800 },
// ];

export const Dashboard = () => {
  return (
    <div className="w-screen p-4 overflow-x-hidden">
      <Navbar />
      {/* Main */}
      <div className="flex justify-center items-center flex-col h-80 gap-10 text-justify md:text-center">
        <h1 className="font-bold text-6xl">Sistema de Controle Financeiro Pessoal</h1>
        <Button className="cursor-pointer" size={'lg'}>
          Adicionar Despesa
        </Button>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3">
        <div className="col-span-1">
          <h2 className="font-bold text-2xl">Saldo</h2>
          <GraficoLinha />
        </div>
        <div className="col-span-2 h-[400px] overflow-y-scroll">
          <h2 className="font-bold text-2xl">Despesas Mensais</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Netflix</TableCell>
                <TableCell>
                  <Badge className="bg-green-400 text-black">
                    <BadgeCheck />
                  </Badge>
                </TableCell>
                <TableCell className="pl-10">05</TableCell>
                <TableCell>Outros</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Button title="Editar Item" className="cursor-pointer">
                      <PenBoxIcon />
                    </Button>
                    <Button
                      variant={'destructive'}
                      className="cursor-pointer"
                      title="Deletar Transferência"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Água</TableCell>
                <TableCell>
                  <Badge className="bg-yellow-400 text-black">
                    <BadgeAlert />
                  </Badge>
                </TableCell>
                <TableCell className="pl-10">10</TableCell>
                <TableCell>Contas e Serviços</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Button title="Editar Item" className="cursor-pointer">
                      <PenBoxIcon />
                    </Button>
                    <Button
                      variant={'destructive'}
                      className="cursor-pointer"
                      title="Deletar Transferência"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Energia</TableCell>
                <TableCell>
                  <Badge className="bg-red-400 text-black">
                    <BadgeX />
                  </Badge>
                </TableCell>
                <TableCell className="pl-10">15</TableCell>
                <TableCell>Contas e Serviços</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Button title="Editar Item" className="cursor-pointer">
                      <PenBoxIcon />
                    </Button>
                    <Button
                      variant={'destructive'}
                      className="cursor-pointer"
                      title="Deletar Transferência"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {/* Se houver despesas mensais ficam aqui com um botão de editar ou apagar */}
        <div>
          <h1>Despesas Fixas</h1>
        </div>
      </div>
    </div>
  );
};
