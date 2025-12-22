import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const dropdownTimerRef = useRef<any | null>(null);

  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    if (openDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openDropdown]);

  const navItems = [
    { path: "/", label: "Home", dropdown: null },
    {
      path: "#explore",
      label: "Explore",
      dropdown: [
        { path: "/categories", label: "App Categories" },
        { path: "/scenarios", label: "Scenarios" },
        { path: "/privacy-economics", label: "Privacy Economics" },
      ],
    },
    {
      path: "#learn",
      label: "Learn",
      dropdown: [
        { path: "/privacy-guide", label: "Privacy Guide" },
        { path: "/guided-learning", label: "Guided Learning" },
      ],
    },
    { path: "/about", label: "About", dropdown: null },
  ];

  const handleNavClick = (path: string, e?: React.MouseEvent) => {
    if (path.startsWith("#")) {
      e?.preventDefault();
      return;
    }
    console.log({ path });
    setActivePath(path);
    setMenuOpen(false);
    navigate(path);
  };

  const handleMouseEnter = (label: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActiveSection = (item: (typeof navItems)[0]) => {
    console.log("Path", item.path, activePath);

    if (item.dropdown) {
      return item.dropdown.some((sub) => sub.path === activePath);
    }
    return item.path === activePath;
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("/")}
          className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
        >
          Data<span className="text-blue-600">Aware</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
              onMouseLeave={() => item.dropdown && handleMouseLeave()}
            >
              {item.dropdown ? (
                // Dropdown trigger
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDropdown(
                      openDropdown === item.label ? null : item.label
                    );
                  }}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                    isActiveSection(item)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                // Regular link
                <button
                  onClick={() => handleNavClick(item.path)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                    activePath === item.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </button>
              )}

              {/* Dropdown Menu */}
              {item.dropdown && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {item.dropdown.map((subItem) => (
                    <button
                      key={subItem.path}
                      onClick={() => handleNavClick(subItem.path)}
                      className={`w-full text-left px-4 py-3 transition-colors cursor-pointer ${
                        activePath === subItem.path
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 hover:text-blue-600 transition-colors"
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
              <div key={item.label}>
                {item.dropdown ? (
                  // Mobile dropdown item
                  <div>
                    <button
                      onClick={() => toggleMobileDropdown(item.label)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium text-left transition-all cursor-pointer ${
                        isActiveSection(item)
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          mobileDropdowns[item.label] ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mobile submenu */}
                    {mobileDropdowns[item.label] && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <button
                            key={subItem.path}
                            onClick={() => handleNavClick(subItem.path)}
                            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                              activePath === subItem.path
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular mobile link
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full px-4 py-3 rounded-lg font-medium text-left transition-all cursor-pointer ${
                      activePath === item.path
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
