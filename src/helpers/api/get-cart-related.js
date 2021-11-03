import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { getToken } from "../auth";

const getCartRelated = async () => {
  const response = await axios.get(
    BASE_API_URL + "/cart-related",
    {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    }
  );

  return response;
};

export default getCartRelated;