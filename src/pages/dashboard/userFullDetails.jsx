import React, {  useState } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import { Link, useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaBuilding,
  FaTransgender,
  FaLanguage,
  FaGraduationCap,
  FaPrayingHands,
  FaLandmark,
  FaTag,
  FaBirthdayCake,
  FaHeart,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersFullDetails,
  getDocumentURL,
} from "../../services/adminApis";
import toast from "react-hot-toast";
import {
  approveProfileDetails,
  rejectProfileDetails,
} from "../../services/adminProfileStatusApis";

const UserFullDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [previewURL, setPreviewURL] = useState("");

  const allUsersData = useSelector( (state) => state?.userReducer?.userDetails?.result);

  const userData = allUsersData?.find((u) => u._id === id);

  const handleViewDocument = async (e) => {
    e.preventDefault();
    if (!userData?.email) return;

    const response = await getDocumentURL(userData.email);
    if (response.success && response.data) {
      const url = response.data;
      setPreviewURL(url);
      window.open(url, "_blank");
    }
  };

  const handleApproveProfile = async (profileId) => {
    try {
      await dispatch(approveProfileDetails(profileId));
      await getAllUsersFullDetails(dispatch);
    } catch (error) {
      toast.error(error.message);
    }

    // if (result?.success) {
    //   console.log("Profile approved successfully");
    // }
  };

  const handleRejectProfile = async (profileId) => {
    try {
      await dispatch(rejectProfileDetails(profileId));
      await getAllUsersFullDetails(dispatch);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Breadcrumb
        paths={[
          { label: "Users", path: "/admin/users" },
          { label: `Full Details`, path: `/admin/users/${id}` },
        ]}
      />

      <h1 className="text-2xl font-bold text-primary mb-6">
        User Full Details
      </h1>

      <div className="bg-white mx-auto py-16 shadow-md rounded-3xl relative">
        <p className="text-primary text-center font-bold text-4xl pb-9">
          My Profile
        </p>

        <div className="flex justify-center items-center gap-14 pb-14 flex-wrap  px-6 md:px-14">
          <img
            src={userData?.profilePic}
            alt="Profile"
            className="w-32 h-32 text-center rounded-full border-3 border-primary shadow-lg"
          />

          <div>
            <p className="text-center text-3xl font-bold text-gray-800 pb-4 px-6 md:px-14">
              {userData?.surName} {userData?.firstName} {userData?.lastName}
            </p>

            <p className="text-center text-lg text-gray-600">
              {userData?.email}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center flex-col px-5 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-y-6 gap-x-12  text-lg">
            <div className="flex items-center gap-5">
              <FaBirthdayCake className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Date of Birth:</p>
                <p className="text-gray-600">
                  {userData?.dateOfBirth
                    ? new Date(userData.dateOfBirth).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : "N/A"}
                  {userData?.myAge ? ` (${userData.myAge} years)` : ""}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaPhone className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Mobile Number:</p>
                <p className="text-gray-600">{userData?.mobile}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaTransgender className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Gender:</p>
                <p className="text-gray-600">{userData?.gender}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaLanguage className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Mother Tongue:</p>
                <p className="text-gray-600">{userData?.motherTongue}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaPrayingHands className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Religion:</p>
                <p className="text-gray-600">{userData?.religion}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaLandmark className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Caste:</p>
                <p className="text-gray-600">{userData?.caste}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaTag className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Sub-Caste:</p>
                <p className="text-gray-600">{userData?.subCaste}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaGraduationCap className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Education:</p>
                <p className="text-gray-600">{userData?.education}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaBuilding className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Job Type:</p>
                <p className="text-gray-600">
                  {" "}
                  {userData?.jobType === "Others"
                    ? userData?.otherJobType
                    : userData?.jobType}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaMapMarkerAlt className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Known Languages:</p>
                <p className="text-gray-600">
                  {Array.isArray(userData?.languages)
                    ? userData.languages.join(", ")
                    : userData?.languages || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaBuilding className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Documents:</p>
                <Link
                  to={previewURL}
                  // target="_blank"
                  onClick={handleViewDocument}
                  className="text-blue-500 font-bold hover:underline hover:text-gray-500"
                >
                  View Document
                </Link>
              </div>
            </div>
          </div>

          <div className="border-b-2 py-5 border-gray-100"></div>

          <p className="text-primary font-bold text-2xl pl-16 py-7">
            My Partner Preferences :
          </p>

          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 text-lg">
            <div className="flex items-center gap-5">
              <FaHeart className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Looking For:</p>
                <p className="text-gray-600">{userData?.lookingFor}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaHeart className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Partner Age:</p>
                <p className="text-gray-600">{userData?.partnerAge}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaLanguage className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Mother Tongue:</p>
                <p className="text-gray-600">{userData?.partnerMotherTongue}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaLandmark className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Caste:</p>
                <p className="text-gray-600">{userData?.partnerCaste}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaPrayingHands className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Religion:</p>
                <p className="text-gray-600">{userData?.partnerReligion}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-9 px-5 md:px-20 py-10 flex-wrap">
          <div>
            <button
              onClick={() => handleApproveProfile(userData?._id)}
              disabled={userData?.isProfileStatus === "Approved"}
              className={`button-styles px-4 ${
                userData?.isProfileStatus === "Approved"
                  ? "bg-gray-400 cursor-not-allowed opacity-60"
                  : "button-styles "
              }`}
            >
              Approve Profile
            </button>
          </div>

          <div>
            <button
              onClick={() => handleRejectProfile(userData?._id)}
              disabled={userData?.isProfileStatus === "Rejected"}
              className={`button-styles px-6 ${
                userData?.isProfileStatus === "Rejected"
                  ? "bg-gray-400 cursor-not-allowed opacity-60"
                  : "button-styles"
              }`}
            >
              Reject Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFullDetails;
