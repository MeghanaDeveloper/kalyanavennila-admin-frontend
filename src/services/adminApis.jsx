import axios from "axios";
import toast from "react-hot-toast";
import {
  setAdminLoginUser,
  setGetAllUserDetails,
} from "../redux/slices/userSlice";

const BASE_URL = import.meta.env.VITE_BASE_ADMIN_URL;

//login
export const adminLoginData = (userName, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      userName: userName,
      password: password,
    });

    if (response && response?.status === 200 && response?.data?.token) {
      localStorage.setItem("adminLoginToken", response?.data?.token);
      dispatch(setAdminLoginUser(response?.data?.user?.userName));
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 3000,
        className: "custom-toast",
      });
      return {
        success: true,
        data: response.data,
      };
    }
  } catch (error) {
    let errorMessages = [];
    if (error.response && error.response.data && error.response.data.error) {
      if (Array.isArray(error.response.data.error)) {
        errorMessages = error.response.data.error.map((err) => err.msg);
      } else if (typeof error.response.data.error === "string") {
        errorMessages = [error.response.data.error];
      } else {
        errorMessages = ["An unknown error occurred"];
      }
    } else {
      errorMessages = ["A network error occurred. Please try again later."];
    }
    errorMessages.forEach((message) => {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        className: "custom-toast",
      });
    });
    return {
      success: false,
      errors: errorMessages,
    };
  }
};

//get all
export const getAllUsersFullDetails = async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/all-users`);
    if (response && response.data && response.status === 200) {
      const result = response?.data?.users;
      const usersCount = response?.data?.usersCount;
      dispatch(setGetAllUserDetails({ result, usersCount }));
      return {
        success: true,
        data: response.data,
      };
    }
  } catch (error) {
    const errors = error.response?.data?.error;
    toast.error(errors, {
      position: "top-center",
      autoClose: 3000,
      className: "custom-toast",
    });
    return {
      success: false,
      errors: errors,
    };
  }
};

//document url
export const getDocumentURL = async (email) => {
  try {
    const token = localStorage.getItem("adminLoginToken");
    if (!token) return;

    const response = await axios.get(`${BASE_URL}/stream-document`, {
      params: { email },
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const imageBlob = new Blob([response.data], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(imageBlob);

    return {
      success: true,
      data: imageUrl,
    };
  } catch (error) {
    if (
      error.response &&
      error.response.data instanceof Blob &&
      error.response.data.type === "application/json"
    ) {
      const errorText = await error.response.data.text();
      const errorJson = JSON.parse(errorText);
      const errorMessage = errorJson.error;

      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
        className: "custom-toast",
      });

      return {
        success: false,
        errors: errorMessage,
      };
    }
  }
};
//
export const getCountOfFieldDetails = async () => {
  try {
    const token = localStorage.getItem("adminLoginToken");
    if (!token) return;

    const response = await axios.get(`${BASE_URL}/fields-count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response && response.data && response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    }
  } catch (error) {
    const errors = error.response?.data?.error;
    toast.error(errors, {
      position: "top-center",
      autoClose: 3000,
      className: "custom-toast",
    });
    return {
      success: false,
      errors: errors,
    };
  }
};
