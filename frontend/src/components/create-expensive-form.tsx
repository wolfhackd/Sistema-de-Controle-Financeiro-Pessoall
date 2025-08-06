import { usecreateExpensive } from '@/hooks/use-create-expensive';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Switch } from './ui/switch';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const despesaSchema = z.object({
  nome: z.string('O nome é obrigatório').nonempty(),
  status: z.number('Erro no status'),
  mensal: z.boolean('Erro no mensal'),
  vencimento: z.number('Erro no vencimento'),
  categoria: z.string('Erro na categoria').nonempty(),
  valor: z
    .number('Use pontos e não vírgulas')
    .refine((val) => !isNaN(val), { message: 'Valor inválido' }),
});

type Props = {
  onClose?: () => void;
};

export type despesaFormType = z.infer<typeof despesaSchema>;

export const CreateExpensiveForm = ({ onClose }: Props) => {
  const dataCompleta = new Date();
  const dia = dataCompleta.getDate();
  const { mutate: criarDespesa, isPending } = usecreateExpensive();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<despesaFormType>({
    resolver: zodResolver(despesaSchema),
    defaultValues: { vencimento: dia, status: 1, mensal: false },
  });

  const status = watch('status');

  const onSubmit = (data: despesaFormType) => {
    criarDespesa(data, {
      onSuccess: () => {
        toast.success('Despesa criada com sucesso');
        reset();
        setTimeout(() => {
          onClose?.();
        }, 100);
      },
    });
  };

  useEffect(() => {
    Object.values(errors).forEach((error) => {
      if (error && typeof error.message === 'string') {
        toast.error(error.message);
      }
    });
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label className="mb-4" htmlFor="nome">
          Nome
        </Label>
        <Input id="nome" type="text" {...register('nome')} />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="mensal">Mensal?</Label>
        <Switch className="cursor-pointer" id="mensal" {...register('mensal')} />
      </div>

      <div>
        <Label className="mb-4" htmlFor="vencimento">
          Dia do vencimento
        </Label>
        <Input
          id="vencimento"
          type="number"
          min={1}
          max={31}
          inputMode="numeric"
          {...register('vencimento')}
        />
      </div>

      <div>
        <Label className="mb-4" htmlFor="categoria">
          Categoria
        </Label>
        <Input id="categoria" type="text" {...register('categoria')} />
      </div>

      <div>
        <Label className="mb-4" htmlFor="valor">
          Valor (R$)
        </Label>
        <Input
          id="valor"
          type="number"
          step="0.01"
          {...register('valor', { valueAsNumber: true })}
        />
      </div>

      <Select value={String(status)} onValueChange={(value) => setValue('status', Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione o tema" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Não Pago</SelectItem>
          <SelectItem value="1">Pago</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Adicionando...' : 'Adicionar Despesa'}
      </Button>
    </form>
  );
};
