
import { FaHome } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";


const MenuItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: <FaHome size={24} /> },
  { label: "Users", path: "/admin/users", icon: <FaCircleUser size={24} /> },
  { label: "Logout", path: "/admin", icon: <FaHome size={24} />, logout: true },
];


export default MenuItems