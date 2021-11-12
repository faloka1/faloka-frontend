import axios from "axios";
import { BASE_API_URL } from "../../../config/api";
import { getToken } from "../../auth";

const getCartItems = async () => {
  const response = await axios.get(
    BASE_API_URL + "/cart",
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  );

  return response;
};

export default getCartItems;