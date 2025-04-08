import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const Breadcrumb = ({ paths = [] }) => {
  return (
    <nav
      className="text-gray-600 mb-4 overflow-x-auto whitespace-nowrap"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center text-sm md:text-base">
        <li>
          <Link
            to="/admin/dashboard"
            className="hover:underline font-bold hover:text-amber-400 text-primary text-base sm:text-lg md:text-xl"
          >
            Home
          </Link>
        </li>

        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            <FaChevronRight className="mx-2 text-gray-400" size={12} />
            {index === paths.length - 1 ? (
              <span className="text-gray-500 text-base sm:text-lg">{path.label}</span>
            ) : (
              <Link
                to={path.path}
                className="hover:underline text-primary font-medium text-base sm:text-lg"
              >
                {path.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
