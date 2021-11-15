import axios from "axios";
import { BASE_API_URL } from "../../../config/api";
import { getToken } from "../../auth";

const getUserProducts = async () => {
  const response = await axios.get(
    BASE_API_URL + "/inspireme/user/products",
    {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    }
  );

  return response;
};

export default getUserProducts;