import axios from "axios";
import { BASE_URL } from "../../config/api";

const getHomeData = async () => {
  const response = await axios.get(BASE_URL + "/home");

  return response;
};

export default getHomeData;