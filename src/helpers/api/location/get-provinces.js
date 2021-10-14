import axios from "axios";
import { BASE_API_URL } from "../../../config/api";

const getProvinces = async (provinceId) => {
  const search = !!provinceId ? `?id=${provinceId}` : '';
  const response = await axios.get(BASE_API_URL + `/province${search}`);

  return response;
};

export default getProvinces;