import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateAccount } from '@/hooks/use-create-account';

const createAcountSchema = z
  .object({
    email: z.email('Digite o email').nonempty('Este campo não pode ser vazio'),
    nome: z.string('Digite o nome').nonempty('Este campo não pode ser vazio'),
    senha: z
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .max(50, 'A senha deve ter no máximo 50 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/\d/, 'A senha deve conter pelo menos um número')
      .regex(/[@$!%*?&]/, 'A senha deve conter pelo menos um caractere especial'),
    confirmarSenha: z.string().min(6, 'A Confirmação deve ter no mínimo 6 caracteres'),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  });

type CreateAccountFormData = z.infer<typeof createAcountSchema>;

type CreateAccountFormProps = React.ComponentProps<'form'> & {
  onToggle?: () => void;
};

export function CreateAccountForm({ className, onToggle, ...props }: CreateAccountFormProps) {
  const { mutate: criarConta, isPending } = useCreateAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAcountSchema),
  });

  const Submit = (data: CreateAccountFormData) => {
    criarConta(
      {
        email: data.email,
        confirmarSenha: data.confirmarSenha,
        nome: data.nome,
        senha: data.senha,
      },
      {
        onSuccess: (data) => {
          alert(data.message);
          console.log(data.message);
        },
      },
    );
  };

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={handleSubmit(Submit)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crie sua conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Digite seu e-mail abaixo para criar sua conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Nome</Label>
          <Input id="nome" type="text" placeholder="Mauro" {...register('nome')} />
          {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
          </div>
          <Input id="password" type="password" {...register('senha')} />
          {errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Repita a Senha</Label>
          </div>
          <Input id="password-confirm" type="password" {...register('confirmarSenha')} />
          {errors.confirmarSenha && (
            <span className="text-red-500 text-sm">{errors.confirmarSenha.message}</span>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Criando...' : 'Criar Conta'}
        </Button>
      </div>
      <div className="text-center text-sm">
        Tem conta?{' '}
        <Button
          variant={'link'}
          className="underline underline-offset-4 cursor-pointer"
          onClick={onToggle}
          type="button"
        >
          Login
        </Button>
      </div>
    </form>
  );
}
