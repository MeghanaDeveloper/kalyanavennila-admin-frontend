import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  blockProfileDetails,
  rejectProfileDetails,
} from "../../services/adminProfileStatusApis";
import toast from "react-hot-toast";
import { getAllUsersFullDetails } from "../../services/adminApis";

const StatusModals = ({ show, handleClose, userId, actionType }) => {
  const [reason, setReason] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      if (!reason.trim()) {
        toast.error("Rejection reason is required.");
        return;
      }

      if (actionType === "reject") {
        await dispatch(rejectProfileDetails(userId, reason));
        await getAllUsersFullDetails(dispatch);
      } else if (actionType === "block") {
        await dispatch(blockProfileDetails(userId, reason));
        await getAllUsersFullDetails(dispatch);
      }
      setReason("");
      handleClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    show && (
      <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 shadow-2xl ">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border-4 border-primary">
          <h2 className="text-xl font-bold mb-4 text-primary">
            {actionType === "reject"
              ? "Reason for profile Rejection"
              : "Reason for  Blocking this profile"}
          </h2>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
          ></button>

          <textarea
            rows={6}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder={
              actionType === "reject"
                ? "Enter rejection reason..."
                : "Enter blocking reason..."
            }
          />

          <div className="mt-4 flex justify-end gap-6">
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded-xl font-bold hover:bg-gray-400 cursor-pointer"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-amber-400 cursor-pointer"
              disabled={!reason.trim()}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default StatusModals;
