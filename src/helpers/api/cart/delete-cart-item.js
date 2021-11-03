import axios from "axios";
import { BASE_API_URL } from "../../../config/api";
import { getToken } from "../../auth";

const deleteCartItem = async (cartId) => {
  const response = await axios.delete(
    BASE_API_URL + `/cart/${cartId}`,
    {},
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  );

  return response;
};

export default deleteCartItem;