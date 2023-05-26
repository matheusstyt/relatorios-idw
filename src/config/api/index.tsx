import { toast } from "react-toastify";

import axios from "axios";

import { APP_SETTINGS } from "../";
import { ErrorTranslate } from "./errorTranslate";
import React from "react";

const APP_BASE_URL = "http://170.10.0.206:8080/idw/rest/v2";

const body_login = {
  login : "map",
  senha : "map"
}
await axios.post(`${APP_BASE_URL}/login`, body_login)
      .then( res => {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("cdGt", res.data.cdGt);
      })


const api = axios.create({
  baseURL: `${APP_BASE_URL}`,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

api.interceptors.request.use(async (config: any) => {
  try {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `${token}`;

      return config;
    }
  } catch (error: any) {
    console.log("AXIOS INTERCEPTORS: ", error);
  }
});

// api.interceptors.response.use(
//   (res: any) => res,
//   async (error: any) => {
//     const requestStatus = error?.response?.status;
//     const serverError = error?.response?.data;
//     console.log("err", error);
//     switch (requestStatus) {
//       case 400: {
//         /*   refreshToken(); */
//         console.log("server", serverError);
//         const message = serverError
//           ? ErrorTranslate.ObterErrorMessage(serverError.codigoErro)
//           : "Sua sessão expirou, entre novamente!";

//         const toastId_401 = "NOTIFY_SERVER_ERROR_401";

//         const logout_delay = 5000;

//         toast.warn(message, {
//           toastId: toastId_401,

//           ...(error?.response?.data?.auth === false && {
//             autoClose: logout_delay,
//           }),
//         });

//         // setTimeout(() => {
//         //     localStorage.removeItem("_TOKEN");
//         //     localStorage.removeItem("_user_cdUsr");
//         //     window.location.reload();
//         // }, logout_delay);

//         break;
//       }
//       case 401: {
//         /*   refreshToken(); */

//         const message = serverError
//           ? serverError //serverError.code buscar na funcao
//           : "Sua sessão expirou, entre novamente!";

//         const toastId_401 = "NOTIFY_SERVER_ERROR_401";

//         const logout_delay = 5000;

//         toast.warn(message, {
//           toastId: toastId_401,

//           ...(error?.response?.data?.auth === false && {
//             autoClose: logout_delay,
//           }),
//         });

//         setTimeout(() => {
//           localStorage.removeItem("_TOKEN");
//           localStorage.removeItem("_user_cdUsr");
//           window.location.reload();
//         }, logout_delay);

//         break;
//       }

//       case 500: {
//         const message_500 = (
//           <p>
//             <strong>ERRO {requestStatus}</strong>: Possível problema nos
//             serviços, aguarde as correções!
//           </p>
//         );

//         const toastId_500 = "NOTIFY_SERVER_ERROR_500";

//         toast.warn(message_500, {
//           toastId: toastId_500,
//           autoClose: 5000,
//         });

//         break;
//       }

//       default: {
//         /*   refreshToken(); */

//         const message = ErrorTranslate.ObterErrorMessage(serverError?.code);

//         const toastId_401 = "NOTIFY_SERVER_ERROR_401";

//         const logout_delay = 5000;

//         toast.warn(message, {
//           toastId: toastId_401,

//           ...(error?.response?.data?.auth === false && {
//             autoClose: logout_delay,
//           }),
//         });
//         //console.log(serverError.code);
//         //  setTimeout(() => {
//         //     localStorage.removeItem("_TOKEN");
//         //     localStorage.removeItem("_user_cdUsr");
//         //     window.location.reload();
//         //  }, logout_delay);

//         break;
//       }
//     }
//   }
// );

export default api;
