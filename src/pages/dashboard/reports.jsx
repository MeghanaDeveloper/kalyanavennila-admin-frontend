import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import { getAllUserClickTrackings } from "../../services/clickTrackingApis";

const Reports = () => {
  const [trackingData, setTrackingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUserClickTrackings();
      setTrackingData(response?.data);
    };
    fetchUsers();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(trackingData?.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = trackingData?.slice(indexOfFirstUser, indexOfLastUser);
  return (
    <>
      <Breadcrumb paths={[{ label: "Reports", path: "/admin/reports" }]} />

      <h1 className="text-2xl font-bold mb-10 text-primary">Reports</h1>

      <div className="bg-white p-9 rounded-xl shadow-md border border-primary mb-6">
        <h2 className="text-2xl font-bold mb-6 text-primary">
          User Analytics - Clicks & Traversal
        </h2>
        {currentUsers.map((user, index) => (
          <>
            <div key={index}>
              {/* User Info */}
              <div className="mb-4">
                <p className="text-xl font-bold text-primary">
                  {user.accountId} - {user.firstName} - ({user.email})
                </p>
              </div>

              {/* Click Ticker */}
              <div className="mb-4">
                <p className="text-xl font-bold text-green-600 mb-6">
                  🖱️ Clicked URLs (Ticker Style)
                </p>
                {user.clicks.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {user.clicks.map((click, i) => (
                      <div
                        key={i}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm shadow-sm"
                      >
                        {click.url}
                        {"   "}
                        <span className="font-semibold">({click.count})</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No clicks recorded.</p>
                )}
              </div>

              {/* Traversal History */}

              <div className="mt-9">
                <h4 className="text-xl font-bold text-primary mb-4">
                  📍 Page Traversal History
                </h4>
                {user.traversal.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {user.traversal.map((t, i) => (
                      <div
                        key={i}
                        className="bg-blue-50 text-blue-900 px-4 py-2 rounded shadow text-sm border border-blue-200"
                      >
                        {t.url}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    No page traversal recorded.
                  </p>
                )}
              </div>
            </div>
            <hr className="border-primary  my-9 border-2" />
          </>
        ))}

        {/* pagination controls */}
        <div className="flex justify-center items-center mt-14 mb-9 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold border-primary border-2"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
            (page) => (
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
            )
          )}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold border-primary border-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Reports;
