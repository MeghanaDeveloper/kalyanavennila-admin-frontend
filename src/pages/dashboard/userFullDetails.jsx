import React, { useState } from "react";
import Breadcrumb from "../../components/common/breadcrumb";
import { Link, useParams } from "react-router-dom";
import {
  FaSpinner,
  FaPhone,
  FaBuilding,
  FaTransgender,
  FaLanguage,
  FaGraduationCap,
  FaPrayingHands,
  FaLandmark,
  FaTag,
  FaGlobeAmericas,
  FaCity ,
  FaBirthdayCake,
  FaHeart,
  FaUserCircle,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import { GiCapitol } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersFullDetails,
  getDocumentURL,
} from "../../services/adminApis";
import toast from "react-hot-toast";
import { approveProfileDetails } from "../../services/adminProfileStatusApis";
import StatusModals from "./statusModals";

const UserFullDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [previewURL, setPreviewURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [actionType, setActionType] = useState("reject");
  const [loading, setLoading] = useState(false);

  const allUsersData = useSelector(
    (state) => state?.userReducer?.userDetails?.result
  );

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
    setLoading(true);
    try {
      await dispatch(approveProfileDetails(profileId));
      await getAllUsersFullDetails(dispatch);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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

      <div className="bg-blue-50 mx-auto py-16 shadow-xl rounded-3xl relative">
        <p className="text-primary text-center font-bold text-4xl pb-9">
          My Profile
        </p>

        {loading && (
          <div className="absolute inset-0 bg-white/70 flex justify-center items-center z-10">
            <FaSpinner className="text-primary animate-spin text-4xl" />
          </div>
        )}

        {(userData?.rejectionReason || userData?.blockedReason) && (
          <div className="bg-gray-50 shadow-md rounded-2xl mx:px-14 px-6 py-10 mb-8 md:mx-10 mx-4">
            {userData.rejectionReason && (
              <>
                <p className="text-3xl font-bold text-red-600">
                  Rejection Reason:
                </p>
                <p className="text-2xl pt-3">{userData.rejectionReason}</p>
              </>
            )}

            {userData.blockedReason && (
              <div className="pt-6">
                <p className="text-3xl font-bold text-red-600">
                  Blocked Reason:
                </p>
                <p className="text-2xl pt-3">{userData.blockedReason}</p>
              </div>
            )}
          </div>
        )}

        <div className="bg-gray-50 shadow-md rounded-2xl mx:px-14  px-6 py-10 mb-8 md:mx-10 mx-4 ">
          <div className="flex justify-start items-center gap-14 flex-wrap">
            <img
              src={userData?.profilePic}
              alt="Profile"
              className="w-44 h-44 text-center rounded-2xl border-3 border-primary shadow-lg"
            />

            <p className="text-center text-3xl font-bold text-gray-800 pt-6 pb-2">
              {userData?.surName} {userData?.firstName} {userData?.lastName}
              <br />
              <span className=" text-xl"> [{userData?.accountId}]</span>
              <span className="block text-gray-400 text-base">
                (Profile Created By {userData?.accountCreatedBy})
              </span>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 shadow-md rounded-2xl mx:px-14  px-6 py-10 mb-8 md:mx-10 mx-4 ">
          <p className="text-2xl font-bold text-primary mb-4">
            Personal Information
          </p>

          <div className="flex items-center gap-5 pb-6">
            <FaEnvelope className="text-primary" />
            <div>
              <p className="font-bold text-gray-700">Email:</p>
              <p className="text-gray-600">{userData?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
            <div className="flex items-center gap-5">
              <FaUserCircle className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Full Name:</p>
                <p className="text-gray-600">
                  {userData?.surName} {userData?.firstName} {userData?.lastName}
                </p>
              </div>
            </div>

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
              <FaGlobe className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Known Languages:</p>
                <p className="text-gray-600">
                  {Array.isArray(userData?.languages)
                    ? userData.languages.join(", ")
                    : userData?.languages || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <hr className="my-8 text-gray-400" />

          <p className="text-2xl font-bold text-primary mb-4">
            Community Information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
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
          </div>
        </div>

        <div className="bg-gray-50 shadow-md rounded-2xl px-6 py-10 mb-8 md:mx-10 mx-4">
          <p className="text-2xl font-bold text-primary mb-4">
            Communication Information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
            <div className="flex items-center gap-5">
              <FaPhone className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Mobile Number:</p>
                <p className="text-gray-600">{userData?.mobile}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
                <FaGlobeAmericas className="text-primary" />
                <div>
                  <p className="font-bold text-gray-700">Country:</p>
                  <p className="text-gray-600">{userData?.locationDetails?.country?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <GiCapitol className="text-primary" />
                <div>
                  <p className="font-bold text-gray-700">State :</p>
                  <p className="text-gray-600">{userData?.locationDetails?.state?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <FaCity className="text-primary" />
                <div>
                  <p className="font-bold text-gray-700">City:</p>
                  <p className="text-gray-600">{userData?.locationDetails?.city?.name}</p>
                </div>
              </div>
          </div>
        </div>

        <div className="bg-gray-50 shadow-md rounded-2xl px-6 py-10 mb-8 md:mx-10 mx-4">
          <p className="text-2xl font-bold text-primary mb-4">
            Education / Profession details
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
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
          </div>
        </div>

        <div className="bg-gray-50 shadow-md rounded-2xl px-6 py-10 mb-8 md:mx-10 mx-4">
          <p className="text-2xl font-bold text-primary mb-4">
            Uploaded Document Information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
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
        </div>

        <div className="bg-gray-50 shadow-md rounded-2xl px-6 py-10 mb-8 md:mx-10 mx-4">
          <p className="text-2xl font-bold text-primary mb-4">
            My Partner Preferences
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-lg">
            <div className="flex items-center gap-5">
              <FaHeart className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Looking For:</p>
                <p className="text-gray-600">
                  {userData?.partnerPreferences?.lookingFor}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaHeart className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Partner Age:</p>
                <p className="text-gray-600">
                  {userData?.partnerPreferences?.partnerAge}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaLanguage className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Mother Tongue:</p>
                <p className="text-gray-600">
                  {userData?.partnerPreferences?.partnerMotherTongue}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaLandmark className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Caste:</p>
                <p className="text-gray-600">
                  {userData?.partnerPreferences?.partnerCaste}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <FaPrayingHands className="text-primary" />
              <div>
                <p className="font-bold text-gray-700">Religion:</p>
                <p className="text-gray-600">
                  {userData?.partnerPreferences?.partnerReligion}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 shadow-md rounded-2xl px-6 py-10 mb-8 md:mx-10 mx-4">
          <div className="flex justify-end items-center gap-9 flex-wrap">
            <div>
              <button
                onClick={() => handleApproveProfile(userData?._id)}
                disabled={userData?.isProfileStatus === "Approved"}
                className={`button-styles rounded-2xl px-9 ${
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
                onClick={() => {
                  setSelectedUserId(userData?._id);
                  setActionType("reject");
                  setShowModal(true);
                }}
                disabled={userData?.isProfileStatus === "Rejected"}
                className={`button-styles rounded-2xl px-9 ${
                  userData?.isProfileStatus === "Rejected"
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : "button-styles"
                }`}
              >
                Reject Profile
              </button>
            </div>

            <div>
              <button
                onClick={() => {
                  setSelectedUserId(userData?._id);
                  setActionType("block");
                  setShowModal(true);
                }}
                disabled={userData?.isProfileStatus === "Blocked"}
                className={`button-styles rounded-2xl px-9 ${
                  userData?.isProfileStatus === "Blocked"
                    ? "bg-gray-400 cursor-not-allowed opacity-60"
                    : "button-styles"
                }`}
              >
                Block Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <StatusModals
        show={showModal}
        handleClose={() => setShowModal(false)}
        userId={selectedUserId}
        actionType={actionType}
      />
    </>
  );
};

export default UserFullDetails;
