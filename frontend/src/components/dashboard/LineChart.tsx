import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type DadosDoAno = {
  label: string;
  Saldo: number;
};

const year: DadosDoAno[] = [
  { label: 'Janeiro', Saldo: 1500 },
  { label: 'Fevereiro', Saldo: 1200 },
  { label: 'Março', Saldo: 1350 },
  { label: 'Abril', Saldo: 1600 },
  { label: 'Maio', Saldo: 1450 },
  { label: 'Junho', Saldo: 1700 },
  { label: 'Julho', Saldo: 1550 },
  { label: 'Agosto', Saldo: 1650 },
  { label: 'Setembro', Saldo: 1400 },
  { label: 'Outubro', Saldo: 1750 },
  { label: 'Novembro', Saldo: 1600 },
  { label: 'Dezembro', Saldo: 1800 },
];

export function GraficoLinha() {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={year} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Saldo" stroke="#4f46e5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
