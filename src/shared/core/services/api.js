import axios from 'axios';

const API_DOMAIN = process.env.REACT_APP_BASE_URL;
export class ApiService {
  axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${API_DOMAIN}/`,
      timeout: 600000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.axiosInstance.interceptors.request.use((_config) => {
      return _config;
    });
    this.axiosInstance.interceptors.response.use(
      async (response) => {
        return response;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );
  }

  makeRequest(method, url, moreConfigs = {}) {
    return this.axiosInstance({
      method,
      url,
      ...moreConfigs,
    });
  }
}
