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

      <div className="grid gap-6 mt-10 md:grid-cols-2">
  {usersCount?.religion && (
    <div className="bg-white shadow-lg rounded-2xl p-6 transition-all hover:shadow-xl">
      <h2 className="text-xl font-bold text-primary mb-4">Religion Wise Registrations</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-orange-100">
            <th className="p-3">Religion</th>
            <th className="p-3">Count</th>
          </tr>
        </thead>
        <tbody>
          {usersCount.religion.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="p-3">{item._id || "Not Provided"}</td>
              <td className="p-3">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {usersCount?.caste && (
    <div className="bg-white shadow-lg rounded-2xl p-6 transition-all hover:shadow-xl">
      <h2 className="text-xl font-bold text-primary mb-4">Caste Wise Registrations</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-orange-100">
            <th className="p-3">Caste</th>
            <th className="p-3">Count</th>
          </tr>
        </thead>
        <tbody>
          {usersCount.caste.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="p-3">{item._id || "Not Provided"}</td>
              <td className="p-3">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {usersCount?.job && (
    <div className="bg-white shadow-lg rounded-2xl p-6 transition-all hover:shadow-xl">
      <h2 className="text-xl font-bold text-primary mb-4">Job Wise Registrations</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-orange-100">
            <th className="p-3">Job</th>
            <th className="p-3">Count</th>
          </tr>
        </thead>
        <tbody>
          {usersCount.job.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="p-3">{item._id || "Not Provided"}</td>
              <td className="p-3">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {usersCount?.motherTongue && (
    <div className="bg-white shadow-lg rounded-2xl p-6 transition-all hover:shadow-xl">
      <h2 className="text-xl font-bold text-primary mb-4">Mother Tongue Registrations</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-orange-100">
            <th className="p-3">Mother Tongue</th>
            <th className="p-3">Count</th>
          </tr>
        </thead>
        <tbody>
          {usersCount.motherTongue.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="p-3">{item._id || "Not Provided"}</td>
              <td className="p-3">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


    </>
  );
};

export default Dashboard;
