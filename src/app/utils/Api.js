/*
 * @see https://www.npmjs.com/package/apisauce
 */

import { create } from 'apisauce';
import { toast } from 'react-toastify';
// import Renegade from 'renegade';



const RedirectHandler = (response) => {
  try {
    if (response.data?.data?.redirectPath) {
      console.log('redirecting...');
      window.location = response.data.data.redirectPath
    }
  } catch (err) {
    console.log('Whats going on?');
    console.error(err);
  }
}

const MessagesHandler = (response) => {
  try {
    let status = response?.data?.CODE;
    const message = response?.data?.Message;

    if (status === "FAILED") {
      toast.error(message);
    }

    if (status === 1) {
      if (message)
        toast.success(message);
    }
  } catch (error) {
    console.error(error);
  }
};


const httpClientConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 100000,
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  },
};

if (localStorage.getItem('token')) {
  httpClientConfig.headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
}

if (process.env.REACT_APP_BASIC_AUTH_USERNAME) {
  httpClientConfig.auth = {
    username: process.env.REACT_APP_BASIC_AUTH_USERNAME,
    password: process.env.REACT_APP_BASIC_AUTH_PASSWORD,
  };
}

// define the api
const Api = create(httpClientConfig);
Api.addResponseTransform(RedirectHandler);
Api.addResponseTransform(MessagesHandler);

Api.addRequestTransform((request) => {
  try {
    if (['patch', 'post', 'put', 'get'].includes(request.method) && window.store) {
      // const { csrfToken } = window.store.getState`().MetaReducer;
      // eslint-disable-next-line no-underscore-dangle
      if (request.data) {
        // request.data._token = csrfToken;
      }
      if (request.url !== "/login") {
        // request.headers['Authorization'] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInVzZXJuYW1lIjoiYWRtaW4iLCJ1c2VyX3JpZ2h0cyI6IjEiLCJ0eXBlX2lkIjoiMSIsInBob25lX251bSI6IjAwNjE0MjE0NDc3NjAiLCJyb2xlX2lkIjoiMTMiLCJicmFuY2hfaWQiOiIxIiwiYWdlbnRfaWQiOiIxIiwiZW1haWwiOiJtdWhhbW1hZG5hd2F6QGdtYWlsLmNvbSIsImltZyI6bnVsbCwidGltZXpvbmUiOiJBdXN0cmFsaWFcL1N5ZG5leSIsImlzX2xvZ2dlZF9pbiI6MSwiaWF0IjoxNjE2MzUyMDQyLCJleHAiOjE2MTYzNzAwNDJ9.sPCvUTQm9Nm0KxETMyDiYIGtNsZzvSwz-APBfLbyxaA";
      }
    }
  } catch (err) {
    console.error(err);
  } 
});


Api.addResponseTransform(response => {
  if (response.ok === false)
    try {
    } catch (e) {
      throw e({
        code: response.status,
        type: response.problem,
        data: response.data,
      });
    }
});


export default Api;