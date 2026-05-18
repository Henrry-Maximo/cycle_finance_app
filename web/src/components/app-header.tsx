import { LaptopIcon, ScanIcon, TableIcon } from '@phosphor-icons/react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import logoDark from '@/assets/logo_dark.png';
import logoWhite from '@/assets/logo_white.png';

import { AccountMenu } from './app-account-menu';
import { NavLink } from './app-nav-link';
import { useTheme } from './theme/theme-provider';
import { ThemeToggle } from './theme/theme-toggle';
import { Separator } from './ui/separator';

export function Header() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const currentLogo = theme === 'dark' ? logoDark : logoWhite;

  async function handleLogout() {
    try {
      localStorage.clear();

      toast.success('Sessão encerrada.');

      navigate(`/sign-in`);
    } catch {
      toast.error('Error ao encerrar sessão do usuário.');
    }
  }

  return (
    <header className="flex h-28 flex-row items-center justify-between border-b px-4 sm:px-12">
      <div className="hidden h-full items-center justify-center gap-12 lg:flex">
        <Link to="/">
          <img
            src={currentLogo}
            className="h-24 w-24"
            alt="logo cycle finance app"
          />
        </Link>

        <Separator orientation="vertical" className="h-auto" />
      </div>

      <nav className="flex items-center space-x-4 lg:space-x-6">
        <NavLink to="/" title="Navega para a página dashboard">
          <LaptopIcon className="h-5 w-5 transition-colors duration-300 group-hover:text-blue-600" />
          <span className="hidden text-sm font-medium transition-colors duration-300 group-hover:text-blue-600 md:block">
            Dashboard
          </span>
        </NavLink>
        <NavLink to="/expenses" title="Navega para a página planilha">
          <TableIcon className="h-5 w-5 transition-colors duration-300 group-hover:text-blue-600" />
          <span className="hidden text-sm font-medium transition-colors duration-300 group-hover:text-blue-600 md:block">
            Despesas
          </span>
        </NavLink>
        <NavLink to="/scan" title="Navega para a página escanear">
          <ScanIcon className="h-5 w-5 transition-colors duration-300 group-hover:text-blue-600" />
          <span className="hidden text-sm font-medium transition-colors duration-300 group-hover:text-blue-600 md:block">
            Escanear
          </span>
        </NavLink>
      </nav>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <AccountMenu handleLogout={handleLogout} />
      </div>
    </header>
  );
}
