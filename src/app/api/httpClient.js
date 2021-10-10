import Axios, { AxiosRequestConfig } from 'axios';
import { Agent } from 'https';
import { Notify } from 'quasar';

/**
 * @type AxiosRequestConfig
 */
const config = {
  baseURL: `${process.env.API_BASE_URL}/`,
  headers: {
   'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

if (process.env.DEV) {
  config.httpsAgent = new Agent({
    rejectUnauthorized: false,
  });
}

const httpClient = Axios.create(config);

const checkErrors = (data) => {
  console.log(data);
  if (data && Array.isArray(data.errors)) {
    if (data.errors.length > 0) {
      showError(data);
      return true;
    }
  }
  return false;
};

function showError(data) {

  if (data && data.message && !data.errors) {
    Notify.create({
      color: 'negative',
      message: 'Data loading error! Try later... ',
      icon: 'report_problem',
      position: 'top',
      avatar: '',
      duration: 5000,
    })
  }

  if (data && data.errors) {
    for (let index in data.errors) {
      for (let subIndex in data.errors[index]) {
        Notify.create({
          color: 'negative',
          message: data.errors[index][subIndex],
          icon: 'report_problem',
          position: 'top',
          avatar: '',
          duration: 5000,
        })
      }
    }
     return;
  }

  if (!data) {
    Notify.create({
      color: 'negative',
      message: 'Data loading error! Try later... ',
      icon: 'report_problem',
      position: 'top',
      avatar: '',
      duration: 5000,
    })
  }
};

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data } = error?.response || {};
    switch (error.response?.status) {
      case 401: {
        showError(data || {message: 'Unauthorized '});
        break;
      }
      case 403: {
        showError(data || {message: 'No access'});
        break;
      }
      case 404: {
        showError(data || {message: 'Not found'});
        break;
      }
      case 400:
      case 422: {
        showError(data);
        break;
      }
      case 500: {
        showError(data);
        break;
      }
      default:
        showError(data);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
