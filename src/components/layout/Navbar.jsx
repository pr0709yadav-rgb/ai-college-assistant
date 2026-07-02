import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", type: "route", path: "/" },
  { name: "Features", type: "scroll", path: "#features" },
  { name: "FAQ", type: "scroll", path: "#faq" },
  { name: "Contact", type: "scroll", path: "#footer" },
];

function Navbar() {
  return (
    <nav className="bg-slate-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-cyan-400 cursor-pointer">
            AI College Assistant
          </h1>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.type === "route" ? (
                <Link
                  to={link.path}
                  className="hover:text-cyan-400 transition"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  href={link.path}
                  className="hover:text-cyan-400 transition"
                >
                  {link.name}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex gap-4">
          <Link
            to="/login"
            className="border border-cyan-400 px-5 py-2 rounded-lg hover:bg-cyan-400 hover:text-black transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-cyan-400 text-black font-semibold px-5 py-2 rounded-lg hover:bg-cyan-300 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/dashboard"
            className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition"
          >
            Dashboard
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;