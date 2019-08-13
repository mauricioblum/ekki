import axios from 'axios';

const api = axios.create({
  baseURL: window.location.host.includes('ekki')
    ? 'https://ekki-backend.herokuapp.com'
    : 'http://127.0.0.1:3333',
});

export default api;
