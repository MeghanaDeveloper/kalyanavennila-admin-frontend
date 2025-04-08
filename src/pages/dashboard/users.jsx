import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsersFullDetails } from "../../services/adminApi's";
import { MdOutlineVisibility } from "react-icons/md";

const Users = () => {
  const allUsersData = useSelector(
    (state) => state?.userReducer?.userDetails?.result
  );

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      await getAllUsersFullDetails(dispatch);
    };
    fetchUsers();
  }, [dispatch]);

  const handleFullDetails = (id) => {
    navigate(`/admin/users/${id}`);
  };

  // Pagination Logic
  const totalPages = Math.ceil(allUsersData.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsersData.slice(indexOfFirstUser, indexOfLastUser);
  console.log(currentUsers, "s");
  return (
    <>
      <Breadcrumb paths={[{ label: "Users", path: "/admin/users" }]} />

      <h1 className="text-2xl font-bold mb-14 text-primary">Users</h1>

      <div className="overflow-x-auto rounded-lg shadow-md border">
        <table className="min-w-full text-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-center text-primary font-bold">
            <tr>
              <th className="px-4 py-2">Account ID</th>
              <th className="px-4 py-2 ">Full Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Date of Birth</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">View Document</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentUsers?.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{user.accountId}</td>

                <td className="px-4 py-2">
                  <div className="flex items-center  gap-5">
                    {console.log(user.profilePic)}
                    <img
                      src={user.profilePic}
                      alt="profile"
                      className="inline-block size-12 rounded-full ring-2 ring-white"
                    />
                    <div className="text-sm font-medium">
                      {user.surName} {user.firstName} {user.lastName}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.mobile}</td>
                <td className="px-4 py-2">
                  {user.dateOfBirth
                    ? new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "_"}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-4 py-2 rounded-full text-white text-sm ${
                      user.isProfileStatus === "pending"
                        ? "bg-yellow-500"
                        : user.isProfileStatus === "approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {user.isProfileStatus}
                  </span>
                </td>
                <td
                  className="text-center"
                  onClick={() => handleFullDetails(user._id)}
                >
                  <div className="flex items-center justify-center h-full group relative cursor-pointer">
                    <MdOutlineVisibility size={24} className="text-primary" />
                    <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
                      View Application
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-9 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Users;
