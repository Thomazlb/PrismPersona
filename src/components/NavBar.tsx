import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import logoImage from "../contexts/prismpersona.png";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-16 px-4">
        <div>
          <Link to="/" className="flex items-center gap-2 text-xl font-display font-bold text-primary">
            <img src={logoImage} alt="PrismPersona Logo" className="h-8 w-auto" />
            PrismPersona
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/about" className="text-sm hover:text-primary transition-colors">
            À propos
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}