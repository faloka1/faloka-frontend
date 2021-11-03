import axios from "axios";
import { BASE_API_URL } from "../../../config/api";
import { getToken } from "../../auth";

const addToCart = async (item) => {
  const response = await axios.post(
    BASE_API_URL + "/cart",
    item,
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  );

  return response;
};

export default addToCart;