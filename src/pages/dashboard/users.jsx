import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsersFullDetails } from "../../services/adminApis";
import { MdOutlineDeleteForever, MdOutlineVisibility } from "react-icons/md";
import { deleteProfileDetails } from "../../services/adminProfileStatusApis";
import toast from "react-hot-toast";

const Users = () => {
  const allUsersData = useSelector(
    (state) => state?.userReducer?.userDetails?.result
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const usersPerPage = 8;

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

  const handleDeleteFullDetails = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;
    try {
      await dispatch(deleteProfileDetails(id));
      await getAllUsersFullDetails(dispatch);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Filtered Users
  // Filtered and Searched Users
  const filteredUsers = allUsersData
    ?.filter((user) =>
      filterStatus === "All" ? true : user.isProfileStatus === filterStatus
    )
    ?.filter((user) => {
      const fullName =
        `${user.surName} ${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        user.accountId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fullName.includes(searchQuery.toLowerCase())
      );
    });

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <Breadcrumb paths={[{ label: "Users", path: "/admin/users" }]} />

      <h1 className="text-2xl font-bold mb-3 text-primary">Users</h1>

      <div className="flex justify-between items-center flex-wrap gap-9 mb-9">
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-lg">Search:</label>
          <input
            type="text"
            placeholder="Account ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-500 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-52"
          />
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          <label className="text-lg">Filter by Status:</label>
          <select
            className="border border-gray-500 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-44"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Approved">Approved Profiles</option>
            <option value="Rejected">Rejected Profiles</option>
            <option value="Pending">Pending Profiles</option>
            <option value="Blocked">Blocked Profiles</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md border w-full">
        <table className="min-w-full text-sm sm:text-base text-left">
          <thead className="bg-gray-100 text-primary font-bold text-center">
            <tr>
              <th className="px-2 sm:px-4 py-2">Account ID</th>
              <th className="px-2 sm:px-4 py-2">Full Name</th>
              <th className="px-2 sm:px-4 py-2">Email</th>
              <th className="px-2 sm:px-4 py-2">Mobile</th>
              <th className="px-2 sm:px-4 py-2">Status</th>
              <th className="px-2 sm:px-4 py-2">View Profile</th>
              <th className="px-2 sm:px-4 py-2">Delete Profile</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentUsers && currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-2">{user.accountId}</td>
                  <td className="px-2 sm:px-4 py-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={user.profilePic || null}
                        alt="profile"
                        className="inline-block size-10 sm:size-12 rounded-full ring-2 ring-white"
                      />
                      <div className="text-sm font-medium">
                        {user.surName} {user.firstName} {user.lastName}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-2">{user.email}</td>
                  <td className="px-2 sm:px-4 py-2">{user.mobile}</td>
                  <td className="px-2 sm:px-4 py-2">
                    <span
                      className={`px-4 py-2 rounded-full font-bold text-white text-xs sm:text-sm ${
                        user.isProfileStatus === "Pending"
                          ? "bg-yellow-500"
                          : user.isProfileStatus === "Approved"
                          ? "bg-green-500"
                          : user.isProfileStatus === "Rejected"
                          ? "bg-red-500"
                          : user.isProfileStatus === "Blocked"
                          ? "bg-gray-700"
                          : "bg-gray-400"
                      }`}
                    >
                      {user.isProfileStatus}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2">
                    <div
                      onClick={() => handleFullDetails(user._id)}
                      className="flex items-center justify-center h-full group relative cursor-pointer"
                    >
                      <MdOutlineVisibility size={26} className="text-primary" />
                      <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
                        View Profile
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-2">
                    <div
                      onClick={() => handleDeleteFullDetails(user._id)}
                      className="flex items-center justify-center h-full group relative cursor-pointer"
                    >
                      <MdOutlineDeleteForever
                        size={26}
                        className="text-red-700"
                      />
                      <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded shadow-md whitespace-nowrap z-10">
                        Delete Profile
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-black font-bold"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap justify-center items-center mt-8 gap-2 sm:gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold border-primary border-2"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              page === currentPage
                ? "bg-primary text-white"
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
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold border-primary border-2"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Users;
