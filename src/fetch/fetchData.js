import Promise from 'es6-promise';
import axios from 'axios';
// import {HOST} from "../constants/index";

// axios.defaults.baseURL = HOST;
// axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Promise.polyfill();

// Add a response interceptor
axios.interceptors.response.use(response => {
  return response;
}, (error) => {
  if (error.response.status === 404 && error.response.statusText === 'Unauthorized') {
    window.location.href = axios.defaults.baseURL + '/Login';
  }

  if (error.response.status === 401) {
    window.location.href = axios.defaults.baseURL + '/Login';
  }
  return Promise.reject(error);
});

export const getData = (url, param) => {
  return (
    axios.get(`${url}`, param)
  );
};

export const postData = (url, param, config) => {
  return (
    axios.post(`${url}`, param, config)
  );
};