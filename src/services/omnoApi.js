import axios from "axios";
import { retryOperation } from "../utils/retry-operator.js";
import { UnauthorizedError } from "../middleware/error-handler.js";

const getAuthToken = async () => {
  try {
    const response = await axios.post(
      process.env.OMNO_AUTH_API,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    throw new UnauthorizedError(
      `Failed to get auth token: ${
        error.response?.data?.error || error.message
      }`
    );
  }
};

export const createTransaction = async (transactionData) => {
  try {
    const token = await getAuthToken();
    const response = await retryOperation(() =>
      sendTransaction(transactionData, token)
    );
    return response.data;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
    throw new Error(
      `Failed to create transaction: ${
        error.response?.data?.error || error.message
      }`
    );
  }
};

const sendTransaction = async (transactionData, token) => {
  return axios.post(process.env.OMNO_TRANSACTION_API, transactionData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
