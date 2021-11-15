import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { getToken } from "../auth";

const postLogoutData = async () => {
  try {
    const response = await axios.post(
      BASE_API_URL + "/auth/logout",
      {},
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      },
    );

    return response;
  } catch (error) {
  }
};

export default postLogoutData;