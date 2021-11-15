import axios from "axios";
import { BASE_API_URL } from "../../../config/api";
import { getToken } from "../../auth";

const postInspireMe = async (caption, photo, products) => {
  const formData = new FormData();

  formData.append('caption', caption);
  formData.append('image', photo);

  products.forEach((p, i) => {
    formData.append(`products[${i}][variant_id]`, p.variant_id);
    formData.append(`products[${i}][product_id]`, p.product_id);
  });

  const response = await axios.post(
    BASE_API_URL + "/inspireme",
    formData,
    {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    }
  );

  return response;
};

export default postInspireMe;