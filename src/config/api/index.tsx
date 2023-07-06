import axios from "axios";

const APP_BASE_URL = "http://170.10.0.206:8080/idw/rest/v2";

async function getToken(){
  const body_login = {
    login : "map",
    senha : "map"
  }
  await axios.post(`${APP_BASE_URL}/login`, body_login)
  .then( res => {
    sessionStorage.setItem("token", res.data.token);
    sessionStorage.setItem("cdGt", res.data.cdGt);
  })
}
getToken();

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

export default api;
