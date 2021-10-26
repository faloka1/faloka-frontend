import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const getMixAndMatchItems = async (category) => {
  const search = category ? `?category=${category}` : '';
  const response = await axios.get(BASE_API_URL + "/mix-and-match/items" + search);

  return response;
};

export default getMixAndMatchItems;