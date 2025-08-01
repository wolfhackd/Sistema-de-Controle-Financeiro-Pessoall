import { Button } from '../ui/button';

export const Navbar = () => {
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
        <Button variant={'destructive'} className="cursor-pointer">
          Logout
        </Button>
      </div>
    </div>
  );
};
