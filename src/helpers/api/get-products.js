import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const getProducts = async (category, subcategory) => {
  const response = await axios.get(BASE_API_URL + `/products?category=${category}&subcategory=${subcategory}`);

  return response;
};

export default getProducts;