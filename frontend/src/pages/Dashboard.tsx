import { GraficoLinha } from '@/components/dashboard/LineChart';
import { Navbar } from '@/components/dashboard/Navbar';
import { Modal } from '@/components/modal';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { CreateExpensiveForm } from '../components/create-expensive-form';
import { ListExpensives, type Despesa } from '@/components/dashboard/ListExpensives';
import { useListExpensives } from '@/hooks/use-list-expensives';

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
  const [ModalAddDespesas, setModalAddDespesas] = useState(false);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const { mutate: ListarDespesas } = useListExpensives();

  const FetchExpensives = () => {
    ListarDespesas(undefined, {
      onSuccess: (data) => {
        setDespesas(data.expensives);
        console.log(data.expensives);
      },
    });
  };

  useEffect(() => {
    FetchExpensives();
  }, []);

  return (
    <div className="w-screen p-4 overflow-x-hidden">
      <Navbar />
      {/* Main */}
      <div className="flex justify-center items-center flex-col h-80 gap-10 text-justify md:text-center">
        <h1 className="font-bold text-6xl">Sistema de Controle Financeiro Pessoal</h1>
        <Button className="cursor-pointer" size={'lg'} onClick={() => setModalAddDespesas(true)}>
          Adicionar Despesa
        </Button>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3">
        <div className="col-span-1">
          <h2 className="font-bold text-2xl">Saldo</h2>
          <GraficoLinha />
        </div>
        <ListExpensives data={despesas} onChange={FetchExpensives} />
        <div>
          <h1>Despesas Fixas</h1>
        </div>
      </div>
      {/* Modal */}

      <Modal isOpen={ModalAddDespesas} onClose={() => setModalAddDespesas(false)}>
        <CreateExpensiveForm
          onClose={() => setModalAddDespesas(false)}
          onCreate={FetchExpensives}
        />
      </Modal>
    </div>
  );
};
