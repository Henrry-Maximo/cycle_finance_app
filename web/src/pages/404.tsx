import { MoneyIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const messages = [
  'Clicando não vai aparecer a página...',
  'Sério, não vai.',
  'Isso não está no orçamento.',
  'Cada clique seu custa R$ 0,01.',
  'Já somou quanto gastou clicando aqui?',
  'Isso virou despesa recorrente.',
  'Seu contador financeiro estaria desapontado.',
  'Modo caos ativando em breve...',
  'Última chance de parar.',
  'Tudo bem, você pediu.',
];

function Coin({ style }: { style: React.CSSProperties }) {
  return (
    <span
      className="pointer-events-none fixed animate-bounce text-2xl"
      style={style}
    >
      <MoneyIcon className="h-4 w-4" />
    </span>
  );
}

export function NotFound() {
  const [clicks, setClicks] = useState(0);
  const chaos = clicks >= 10;

  const coins = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    style: {
      top: `${Math.random() * 90}vh`,
      left: `${Math.random() * 95}vw`,
      animationDelay: `${Math.random() * 1.5}s`,
      animationDuration: `${0.6 + Math.random()}s`,
    },
  }));

  return (
    <div className="flex h-screen flex-1 flex-col items-center justify-center gap-4">
      {chaos && coins.map((c) => <Coin key={c.id} style={c.style} />)}

      <span
        className="text-muted-foreground cursor-pointer text-8xl font-bold tracking-tight transition-transform select-none active:scale-95"
        onClick={() => setClicks((p) => p + 1)}
      >
        404
      </span>

      <h1 className="text-accent-foreground text-2xl font-semibold tracking-tight">
        {chaos ? 'MODO CAOS ATIVADO 😉' : 'Página não encontrada'}
      </h1>

      <p className="text-muted-foreground text-sm italic">
        {clicks === 0
          ? 'Parece que essa página foi cortada do orçamento.'
          : messages[Math.min(clicks - 1, messages.length - 1)]}
      </p>

      <p className="text-muted-foreground text-sm">
        Voltar para o{' '}
        <Link to="/sign-in" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
