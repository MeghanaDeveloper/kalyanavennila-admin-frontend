import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/userSlice";
import MenuItems from "./sidebarMenuItems";



const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin");
  };
  return (
    <>
      <div className="flex">
        <div
          className={`fixed  top-0 left-0 h-full md:w-64 bg-primary transition-width duration-300 text-white ${
            isOpen ? "w-64" : "w-20"
          }  `}
        >
          <div className="flex justify-between items-center p-6">
            <Link to='/admin/dashboard' className={`text-2xl font-bold   md:block ${isOpen ? "block" : "hidden"} cursor-pointer`}>
              Kalyana Vennila
            </Link>
            <button
              className="block md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <IoCloseSharp size={24} className="text-amber-800" />
              ) : (
                <FaBars size={24} className="text-amber-800" />
              )}
            </button>
          </div>

          <nav className="mt-3">
            <ul>
              {MenuItems.map((item, index) => (
                <li key={index}>
                  {item.logout ? (
                    <div
                      onClick={handleLogout}
                      className="flex items-center px-6 py-4 hover:bg-amber-500 transition-transform transform hover:-translate-y-1 hover:scale-100 cursor-pointer"
                    >
                      {item.icon}
                      <span
                        className={`ml-6 text-white font-bold text-lg ${
                          isOpen ? "block" : "hidden"
                        } md:block`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="flex items-center px-6 py-4 hover:bg-amber-500 transition-transform transform hover:-translate-y-1 hover:scale-100 cursor-pointer"
                    >
                      {item.icon}
                      <span
                        className={`ml-6 text-white font-bold text-lg ${
                          isOpen ? "block" : "hidden"
                        } md:block`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
