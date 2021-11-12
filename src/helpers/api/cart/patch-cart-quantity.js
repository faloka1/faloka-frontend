import axios from "axios";
import { BASE_API_URL } from "../../../config/api";
import { getToken } from "../../auth";

const patchCartQuantity = async (cartId, quantity) => {
  const response = await axios.patch(
    BASE_API_URL + `/cart/${cartId}`,
    { quantity },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  );

  return response;
};

export default patchCartQuantity;