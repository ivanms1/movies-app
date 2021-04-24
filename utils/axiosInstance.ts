import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 1000,
  withCredentials: false,
});

export default instance;
