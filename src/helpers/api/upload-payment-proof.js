import axios from "axios";
import { BASE_API_URL } from "../../config/api";
import { getToken } from "../auth";

const uploadPaymentProof = async (orderId, formData) => {
  const response = await axios.post(
    `${BASE_API_URL}/uploadpayment/${orderId}`,
    formData,
    {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      }
    }
  );

  return response;
};

export default uploadPaymentProof;