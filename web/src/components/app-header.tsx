import { LaptopIcon, ScanIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import logo from '@/assets/logo.png';

import { NavLink } from './app-nav-link';
import { Separator } from './ui/separator';

export function Header() {
  return (
    <header className="flex h-28 flex-row items-center justify-between border-b bg-black px-12">
      <div className="flex h-full items-center justify-center gap-12">
        <Link to="/">
          <img src={logo} className="h-24 w-24" alt="logo cycle finance app" />
        </Link>

        <Separator orientation="vertical" className="h-auto" />
      </div>

      <nav className="flex items-center space-x-4 lg:space-x-6">
        <NavLink to="/" title="Navega para a página ">
          <LaptopIcon className="h-5 w-5 transition-colors duration-300 group-hover:text-blue-600" />
          <span className="hidden text-sm font-medium transition-colors duration-300 group-hover:text-blue-600 md:block">
            Dashboard
          </span>
        </NavLink>
        <NavLink to="/scan" title="Navega para a página escanear">
          <ScanIcon className="h-5 w-5 transition-colors duration-300 group-hover:text-blue-600" />
          <span className="hidden text-sm font-medium transition-colors duration-300 group-hover:text-blue-600 md:block">
            Escanear
          </span>
        </NavLink>
      </nav>
    </header>
  );
}
