import { LaptopIcon, ScanIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import logo from '@/assets/logo.png';

export function Header() {
  return (
    <header className="flex h-28 flex-row items-center justify-between bg-black px-12 py-2">
      <Link to="/">
        <img src={logo} className="h-24 w-24" alt="logo cycle finance app" />
      </Link>

      <nav className="flex gap-4 text-white">
        <Link
          to="/"
          className="group flex flex-row items-center gap-3 rounded-lg border-2 border-slate-200 px-4 py-3 transition-all duration-300 hover:border-blue-600 active:scale-95"
        >
          <LaptopIcon className="h-5 w-5 text-slate-200 transition-colors duration-300 group-hover:text-blue-600" />
          <span className="text-sm font-medium text-slate-200 transition-colors duration-300 group-hover:text-blue-600">
            Dashboard
          </span>
        </Link>
        <Link
          to="/scan"
          className="group flex flex-row items-center gap-3 rounded-lg border-2 border-slate-200 px-4 py-3 transition-all duration-300 hover:border-blue-600 active:scale-95"
        >
          <ScanIcon className="h-5 w-5 text-slate-200 transition-colors duration-300 group-hover:text-blue-600" />
          <span className="text-sm font-medium text-slate-200 transition-colors duration-300 group-hover:text-blue-600">
            Escanear
          </span>
        </Link>
      </nav>
    </header>
  );
}
