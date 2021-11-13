import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { getToken } from "../auth";

const getUserTransaction = async () => {
  const response = await axios.get(
    BASE_API_URL + "/user/orders",
    {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    }
  );
  return response;
};

export default getUserTransaction;