import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {

    config["params"]={
        api_key: "8d5078c1af6cacad4c6dd8e17c178b20",
      
    }
    config["headers"]={
        Authorization: "my token" 
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });