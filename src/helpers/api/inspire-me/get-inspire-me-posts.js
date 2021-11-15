import axios from "axios";
import { BASE_API_URL } from "../../../config/api";

const getInspireMePosts = async () => {
  const response = await axios.get(BASE_API_URL + "/inspireme");

  return response;
};

export default getInspireMePosts;