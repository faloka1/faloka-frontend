import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const getPopularCategory = async (category) => {
  const response = await axios.get(BASE_API_URL + `/home/populer/${category}`);

  return response;
};

export default getPopularCategory;