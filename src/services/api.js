import axios from 'axios';

const apiClient = axios.create({
  baseURL:
    'https://games-test-api-81e9fb0d564a.herokuapp.com/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'dev-email-address': 'example@gmail.com',
  },
});

export default apiClient;
