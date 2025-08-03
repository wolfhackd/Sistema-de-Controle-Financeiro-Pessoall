import { useLogout } from '@/hooks/use-logout';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const Navbar = () => {
  const { mutate: logout, isPending } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess() {
        navigate('/');
      },
      onError() {
        toast.error('Ocorreu um erro ao deslogar');
      },
    });
  };
  return (
    <div className="flex justify-between items-center border-b-2 border-black/90 py-4 px-6 w-full sticky">
      <h1 className="font-bold text-lg">SCFP</h1>
      <div className="flex gap-4">
        <Button className="cursor-pointer">Nova Transação</Button>
        <Button variant={'secondary'} className="cursor-pointer">
          Nova Categoria
        </Button>
        <Button variant={'outline'} className="cursor-pointer">
          Exportar
        </Button>
        <Button
          variant={'destructive'}
          className="cursor-pointer"
          onClick={handleLogout}
          disabled={isPending}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
