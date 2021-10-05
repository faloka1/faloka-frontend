import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const getHomeData = async () => {
  const response = await axios.get(BASE_API_URL + "/home");

  return response;
};

export default getHomeData;