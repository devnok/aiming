import axios from 'axios';

const baseURL = 'http://c3.iptime.org:1486';
const apiClient = axios.create({
  baseURL,
  responseType: 'json',
});
export { apiClient, baseURL };
