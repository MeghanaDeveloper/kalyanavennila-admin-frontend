import { TbReportSearch } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";

const MenuItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: <FaHome size={24} /> },
  { label: "Users", path: "/admin/users", icon: <FaCircleUser size={24} /> },
  // { label: "Reports", path: "/admin/reports", icon: <TbReportSearch size={24} /> },
  { label: "Logout", path: "/admin", icon: <CiLogout size={26} className="font-bold" />, logout: true },
];


export default MenuItems