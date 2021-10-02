import axios from "axios";
import { BASE_URL } from "../../config/api";

const getPopularCategory = async (category) => {
  const response = await axios.get(BASE_URL + `/home/populer/${category}`);

  return response;
};

export default getPopularCategory;