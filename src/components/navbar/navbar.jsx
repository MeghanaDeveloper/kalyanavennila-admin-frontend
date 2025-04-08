import { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(null);
  return (
    <>
      <nav className="padding-lr bg-primary p-4 shadow-md fixed top-0 left-0 w-full text-white z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/admin" className="text-2xl font-bold cursor-pointer">
            Kalyana Vennila
          </Link>

          <div className="hidden md:flex items-center space-x-3.5 font-medium">
            <Link
              to="/admin/login"
              className="hover:text-gray-300 border border-white rounded-lg cursor-pointer px-3 py-1.5 transition-effects"
            >
              Login
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(isOpen === "mobile" ? null : "mobile")}
          >
            <div className="w-6 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white mb-1"></div>
            <div className="w-6 h-1 bg-white"></div>
          </button>
        </div>

        {isOpen === "mobile" && (
          <div className="md:hidden flex flex-col bg-[#F7641E] p-4 space-y-3">
            <p
              //   onClick={() => [
              //     setIsLoginOpen(true),
              //     setStep(8),
              //     setIsOpen(null),
              //   ]}
              className="hover:text-gray-300 rounded-lg cursor-pointer px-3 py-1.5 transition"
            >
              Login
            </p>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
