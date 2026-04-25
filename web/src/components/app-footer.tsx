export function Footer() {
  return (
    <footer className="flex justify-between bg-black px-24 py-4">
      <p className="text-sm text-zinc-600">
        © {new Date().getFullYear()} Cycle Finance.
      </p>
      <p className="text-sm text-zinc-600">Todos os direitos reservados.</p>
    </footer>
  );
}
