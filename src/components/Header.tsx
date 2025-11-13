import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger icons

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");

  const isActive = (path: string): boolean => activePath === path;

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/categories", label: "App Categories" },
    { path: "/privacy-economics", label: "Privacy Economics" },
    { path: "/about", label: "About" },
  ];

  const handleNavClick = (path: string) => {
    setActivePath(path);
    setMenuOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
        >
          Data<span className="text-blue-600">Aware</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-exo text-lg">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                isActive(item.path)
                  ? "text-blue-600 font-extrabold"
                  : "text-gray-600 hover:text-gray-500"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden bg-white text-black hover:text-blue-600 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="flex flex-col px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`px-4 py-3 rounded-lg font-medium text-left transition-all cursor-pointer ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
