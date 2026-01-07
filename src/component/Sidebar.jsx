import { Link, NavLink } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed z-30 h-full w-64 bg-white shadow-md transform top-0 left-0 transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex md:flex-col md:w-64`}
      >
        <Link
          to="/"
          className="px-6 py-3 text-xl font-bold border-b text-center"
        >
          <h2 className="bg-custom-radial border-solid border-2 border-[#b02b2b] font-bold text-white px-5 py-2 rounded-full text-md">
            Glamify
          </h2>
        </Link>
        <nav className="flex flex-col mt-4">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `px-6 py-3 text-left hover:bg-gray-200 transition-colors ${
                  isActive ? "bg-gray-200 font-semibold" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
