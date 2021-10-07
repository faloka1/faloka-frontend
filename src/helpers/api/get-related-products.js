import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const getRelatedProducts = async (slug) => {
  const response = await axios.get(`${BASE_API_URL}/products/${slug}/related`);

  return response;
};

export default getRelatedProducts;