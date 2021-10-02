import axios from "axios";
import { BASE_URL } from "../../config/api";

const postLoginData = async (loginData) => {
  const response = await axios.post(
    BASE_URL + "/auth/login",
    loginData,
    {
      timeout: 5000,
    }
  );

  return response;
};

export default postLoginData;