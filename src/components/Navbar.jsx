import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Upcoming Shows", path: "/upcoming" },
    { name: "Buy Tickets", path: "/buy" },
    { name: "My Tickets", path: "/mytickets" },
  ];

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-400 tracking-wide">
          ChainPass 🎟️
        </div>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:text-purple-400 transition duration-200 ${
                location.pathname === item.path
                  ? "text-purple-400 font-semibold border-b-2 border-purple-400 pb-1"
                  : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
