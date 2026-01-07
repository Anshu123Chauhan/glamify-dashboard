import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useState } from "react";

const Header = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 py-[0.9rem] flex justify-between gap-4 items-center sticky top-0 z-20">
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={toggleSidebar}
      >
        <FaBars size={25} />
      </button>

      <Link to="/" className="text-center md:hidden">
        <h2 className="bg-custom-radial border-solid border-2 border-[#b02b2b] font-bold text-white px-6 py-2 rounded-full text-md">
          Glamify
        </h2>
      </Link>
      <div className="justify-end w-full flex items-center gap-4">
        <MdOutlineNotificationsNone
          fontSize={42}
          className="text-gray-600 p-1.5 border border-gray-300 rounded-full"
        />
        <div
          className="flex gap-4 items-center cursor-pointer relative"
          onClick={() => setOpen(!open)}
        >
          <img
            src={profile}
            className="rounded-full w-11 h-11 border-red-500"
          />
          <div className="text-gray-700 text-sm">
            <h3 className="">ENS Enterprises</h3>
            <h3>Admin</h3>
          </div>
          <IoIosArrowDown
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {open && (
          <div className="absolute top-16 right-2 bg-white shadow-lg rounded-lg border p-4 z-50 w-72">
            <div className="text-sm text-gray-700 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Name</span>
                <span className="text-left">ENS Enterprises</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Email</span>
                <span className="text-left">admin@ens.com</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pb-2">
                <span className="font-semibold">User Type</span>
                <span className="text-left">Admin</span>
              </div>
              <span className="h-[1px] flex bg-gray-200"></span>

              <button
                onClick={handleLogout}
                className="bg-custom-radial border-solid border-2 border-[#b02b2b] font-bold text-white px-6 py-2 rounded-full text-md mx-auto w-full"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
