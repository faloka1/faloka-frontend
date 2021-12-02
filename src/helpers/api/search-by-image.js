import axios from "axios";
import { BASE_API_URL } from "../../config/api";

const searchByImage = async (image) => {
  const formData = new FormData();
  formData.append('img', image);

  const response = await axios.post(
    BASE_API_URL + "/visual-search/search",
    formData
  );

  return response;
};

export default searchByImage;