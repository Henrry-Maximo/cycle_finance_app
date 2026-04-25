import { Helmet } from 'react-helmet-async';

export function Settings() {
  return (
    <>
      <Helmet title="Settings" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      </div>

      <div className="space-y-2.5"></div>
    </>
  );
}
