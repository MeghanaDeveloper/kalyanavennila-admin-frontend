import axios from "axios";
import toast from "react-hot-toast";
import {  setDeleteUserById, setUpdateProfileStatus } from "../redux/slices/userSlice";

const BASE_URL = import.meta.env.VITE_BASE_ADMIN_URL;

//approve
export const approveProfileDetails = (profileId) => async (dispatch) => {
    try { 
        const token = localStorage.getItem("adminLoginToken")
        if (!token) return; 

        const response = await axios.patch(`${BASE_URL}/approve-profile/${profileId}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (response && response.data && response.status === 200) {
            dispatch(setUpdateProfileStatus(response.data.user))
            toast.success(response?.data?.message, {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast'
            });
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
      const errors = error.response.data.error
      toast.error(errors, {
          position: "top-center",
          autoClose: 3000,
          className: 'custom-toast'
      });
        return {
            success: false,
            errors: errors
        };
    }
}

//reject
export const rejectProfileDetails = (profileId) => async (dispatch) => {
    try {
        const token = localStorage.getItem("adminLoginToken")
        if (!token) return;

        const response = await axios.patch(`${BASE_URL}/reject-profile/${profileId}`,{} ,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        console.log(response,'rejct')
        if (response && response.data && response.status === 200) {
            dispatch(setUpdateProfileStatus(response.data.user))
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast'
            });
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        const errors = error.response.data.error
        toast.error(errors, {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast'
        });
        return {
            success: false,
            errors: errors
        };
    }
}



export const deleteProfileDetails = (profileId) => async (dispatch) => {
    try {
        const token = localStorage.getItem("adminLoginToken")
        if (!token) return;

        const response = await axios.delete(`${BASE_URL}/delete-profile/${profileId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        if (response && response.data && response.status === 200) {
            dispatch(setDeleteUserById(profileId))
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
                className: 'custom-toast'
            });
            return {
                success: true,
                data: response.data
            };
        }
    }
    catch (error) {
        const errors = error.response.data.error
        toast.error(errors, {
            position: "top-center",
            autoClose: 3000,
            className: 'custom-toast'
        });
        return {
            success: false,
            errors: errors
        };
    }
}