import axios from "axios";

const baseURL = `http://localhost:3000/api/v1`;

export const getAllTransaction = async (month, pageNumber, searchQuery) => {
  try {
    const requestURL = `${baseURL}/transactions?month=${month}&pageNumber=${pageNumber}&search=${searchQuery}`;
    const transaction = await axios.get(requestURL);
    return transaction?.data;
  } catch (error) {
    return error?.respone?.error;
  }
};

export const getStatistics = async (month) => {
  try {
    const requestURL = `${baseURL}/transaction-statistics?month=${month}`;
    const response = await axios.get(requestURL);
    return response?.data;
  } catch (error) {
    return error?.response?.error;
  }
};

export const getBarChartStats = async (month) => {
  try {
    const requestURL = `${baseURL}/bar-chart?month=${month}`;
    const response = await axios.get(requestURL);
    return response?.data;
  } catch (error) {
    return error?.response?.error;
  }
};

export const getPieChartStats = async (month) => {
  try {
    const requestURL = `${baseURL}/pie-chart?month=${month}`;
    const response = await axios.get(requestURL);
    return response.data;
  } catch (error) {
    return error.response.error;
  }
};
