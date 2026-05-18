export function Footer() {
  return (
    <footer className="flex justify-center border-t py-4 md:justify-between md:px-24 md:py-4">
      <p className="text-xs text-zinc-600 md:text-sm">
        © {new Date().getFullYear()} Cycle Finance.
      </p>
      <p className="hidden text-zinc-600 md:block md:text-sm">
        Todos os direitos reservados.
      </p>
    </footer>
  );
}
