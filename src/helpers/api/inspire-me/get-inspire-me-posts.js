import axios from "axios";
import { BASE_API_URL } from "../../../config/api";

const getInspireMePosts = async (page) => {
  let url = '/inspireme';

  if (!!page) {
    url += `?page=${page}`;
  }

  const response = await axios.get(BASE_API_URL + url);

  return response;
};

export default getInspireMePosts;