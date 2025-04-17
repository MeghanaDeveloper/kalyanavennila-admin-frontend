import axios from "axios";
import toast from "react-hot-toast";


const BASE_URL = import.meta.env.VITE_BASE_TRACKING_URL;


export const getAllUserClickTrackings = async () => {
    try {
        const token = localStorage.getItem("adminLoginToken")
        if (!token) return;
        
      const response = await axios.get(`${BASE_URL}/all-click-tracking`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
      );
      if (response && response.data && response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      }
    } catch (error) {
      console.log(error);
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