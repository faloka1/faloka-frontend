import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const getProductDetail = async (slug) => {
  const response = await axios.get(BASE_API_URL + "/products/" + slug);

  return response;
};

export default getProductDetail;