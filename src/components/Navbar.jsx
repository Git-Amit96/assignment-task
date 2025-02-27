import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 py-4 px-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          MyApp
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-gray-300  font-bold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/form" className="text-white hover:text-gray-300  font-bold">
              Form
            </Link>
          </li>
          <li>
            <Link to="/auth" className="text-white hover:text-gray-300  font-bold">
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-blue-700 p-4 mt-2 space-y-4">
          <li>
            <Link to="/" className="text-white" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/form" className="text-white" onClick={() => setIsOpen(false)}>
              Form
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
