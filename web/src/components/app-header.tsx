import logo from "@/assets/logo.png";
import { LaptopIcon, ScanIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex flex-row justify-between bg-black px-12 py-2 h-28 items-center">
      <Link to="/">
        <img src={logo} className="h-24 w-24" alt="logo cycle finance app" />
      </Link>

      <nav className="flex gap-4 text-white">
        <Link
          to="/"
          className="group flex flex-row gap-3 items-center border-2 border-slate-200 hover:border-blue-600 rounded-lg px-4 py-3 transition-all duration-300 active:scale-95"
        >
          <LaptopIcon className="h-5 w-5 text-slate-200 group-hover:text-blue-600 transition-colors duration-300" />
          <span className="text-sm font-medium text-slate-200 group-hover:text-blue-600 transition-colors duration-300">
            Dashboard
          </span>
        </Link>
        <Link
          to="/scan"
          className="group flex flex-row gap-3 items-center border-2 border-slate-200 hover:border-blue-600 rounded-lg px-4 py-3 transition-all duration-300 active:scale-95"
        >
          <ScanIcon className="h-5 w-5 text-slate-200 group-hover:text-blue-600 transition-colors duration-300" />
          <span className="text-sm font-medium text-slate-200 group-hover:text-blue-600 transition-colors duration-300">
            Escanear
          </span>
        </Link>
      </nav>
    </header>
  );
}
