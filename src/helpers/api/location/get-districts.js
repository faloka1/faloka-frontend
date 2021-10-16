import axios from "axios";
import { BASE_API_URL } from "../../../config/api";

const getDistricts = async (provinceId) => {
  const response = await axios.get(BASE_API_URL + `/district?province=${provinceId}`);

  return response;
};

export default getDistricts;