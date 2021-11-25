import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const getProducts = async (filter) => {
  const {
    category,
    sub_category,
    search
  } = filter;
  let query = '';

  if (category) {
    query += `category=${category}&`;
  }

  if (sub_category) {
    query += `subcategory=${sub_category}&`;
  }

  if (search) {
    query += `search=${search}`;
  }

  const response = await axios.get(BASE_API_URL + `/products?${query}`);

  return response;
};

export default getProducts;