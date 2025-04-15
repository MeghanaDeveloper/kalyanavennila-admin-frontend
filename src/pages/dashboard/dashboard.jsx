import React, { useEffect } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import { FaClipboardUser } from "react-icons/fa6";
import {  useDispatch, useSelector } from "react-redux";
import { getAllUsersFullDetails } from "../../services/adminApis";


const Dashboard = () => {
    const allUsersData = useSelector((state) => state.userReducer.userDetails)
     
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchUsers = async () => {
       await getAllUsersFullDetails(dispatch);

      };
      fetchUsers();
    }, [dispatch]);


  return (
    <>
      <Breadcrumb paths={[{ label: "Dashboard", path: "/admin/dashboard" }]} />

      <h1 className="text-2xl font-bold mb-14 text-primary ">Dashboard</h1>

      <div className="flex justify-start items-center gap-16">
        <div className="flex flex-col md:flex-row gap-14 p-10 bg-white rounded-lg items-center justify-center shadow-md">
          <div className="w-[75px] h-[75px] rounded-lg flex items-center justify-center bg-red-100">
            <FaClipboardUser size={32} />
          </div>

          <div className="flex flex-col items-center md:items-end justify-center gap-3">
            <h2 className="text-3xl font-semibold text-red-600">{allUsersData?.usersCount}</h2>
            <p className="text-primary text-xl font-bold">Total Users</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
