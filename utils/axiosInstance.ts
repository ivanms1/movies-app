import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.FETCH_BASE_URL,
  timeout: 1000,
  withCredentials: false,
});

export default instance;
