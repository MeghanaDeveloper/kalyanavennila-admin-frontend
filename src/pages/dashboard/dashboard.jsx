import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import { FaClipboardUser } from "react-icons/fa6";
import {  getCountOfFieldDetails } from "../../services/adminApis";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const countResponse = await getCountOfFieldDetails();
      setUsersCount(countResponse.data);

    };
    fetchUsers();
  }, []);

  return (
    <>
      <Breadcrumb paths={[{ label: "Dashboard", path: "/admin/dashboard" }]} />

      <h1 className="text-2xl font-bold mb-14 text-primary">Dashboard</h1>

      <div className="bg-white rounded-2xl shadow-md p-10 mb-9 w-[24vw] flex items-center justify-center gap-6">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-red-100 text-red-600">
            <FaClipboardUser size={28} />
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-3xl font-bold text-red-600">{usersCount?.totalUsers}</h2>
            <p className="text-gray-700 font-medium">Total Users</p>
          </div>
        </div>

      <div className="grid lg:grid-cols-3 gap-10 md:grid-cols-2 grid-cols-1">
        <div className="bg-white rounded-2xl shadow-md p-10 flex items-center justify-center gap-6">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-green-100 text-green-600">
            <FaClipboardUser size={28} />
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-3xl font-bold text-green-600">{usersCount?.approvedProfiles}</h2>
            <p className="text-gray-700 font-medium">Approved Profiles</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-10 flex items-center justify-center gap-6">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-yellow-100 text-yellow-600">
            <FaClipboardUser size={28} />
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-3xl font-bold text-yellow-600">{usersCount?.pendingProfiles}</h2>
            <p className="text-gray-700 font-medium">Pending Profiles</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-10 flex items-center justify-center gap-6">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-red-200 text-red-700">
            <FaClipboardUser size={28} />
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-3xl font-bold text-red-600">{usersCount?.rejectedProfiles}</h2>
            <p className="text-gray-700 font-medium">Rejected Profiles</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
