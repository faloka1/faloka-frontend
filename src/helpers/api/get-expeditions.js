import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const getExpeditions = async () => {
  const response = await axios.get(BASE_API_URL + "/expeditions");

  return response;
};

export default getExpeditions;