import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const postRegisterData = async (registerData) => {
  const response = await axios.post(
    BASE_API_URL + "/auth/register",
    registerData,
    {
      timeout: 5000,
    }
  );

  return response;
};

export default postRegisterData;