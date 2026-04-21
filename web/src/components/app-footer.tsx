export function Footer() {
  return (
    <footer className="flex justify-between bg-black px-24 py-4">
      <p className="text-zinc-600 text-sm">
        © {new Date().getFullYear()} Cycle Finance.
      </p>
      <p className="text-zinc-600 text-sm">Todos os direitos reservados.</p>
    </footer>
  );
}
