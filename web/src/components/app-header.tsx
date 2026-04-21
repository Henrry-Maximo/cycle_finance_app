import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex flex-row justify-between bg-black px-12 py-2 h-28 items-center">
      <img src={logo} className="h-24 w-24" alt="logo cycle finance app" />

      <nav className="flex gap-4 text-white">
        <Link to="#">Home</Link>
        <Link to="#">Dashboard</Link>
        <Link to="#">Profile</Link>
      </nav>
    </header>
  );
}
