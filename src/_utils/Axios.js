import axios from "axios";
import Auth from "./Auth";


//API midlleware to intercept http request
axios.interceptors.request.use(async (config) => {
 //check if the user has already logged in
 if (Auth.getToken() !== null) {
   //add the JWT token to the header of the request and update the axios default configuration to render a custom one
   config.headers.authorization = 'Bearer ' + Auth.getToken()
   const CustomConfig = config
   return CustomConfig
 } else {
   //return the default configuration when the user is not logged in case (login/signUp etc ..)
   //no need to add a JWT token for a none connected user
   return config;
 }

}, (error) => {
 // handle http request error
 return Promise.reject(error);
});

export const Axios = axios