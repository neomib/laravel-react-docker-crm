import axios from "axios";
import store from "../store";
import { setAccessToken, setUser } from "../store/authSlice";
import { API_URL, SUCCESS_STATUS } from "./apiService";

export const authConfig = () => {
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  axios.interceptors.request.use(function (config) {
    if (
      config.url !== `${API_URL}/register` &&
      config.url !== `${API_URL}/login`
    ) {
      const token = store.getState().auth.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        config.headers.Authorization = null;
      }
    }

    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        store.dispatch(setAccessToken(null));
        store.dispatch(setUser(null));
        location.replace("/signin");
        return Promise.reject(error);
      }
      return Promise.reject(error);
    },
  );
};

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });

    const resData = res.data;

    if (resData.status === SUCCESS_STATUS) {
      return true;
    } else {
      return Promise.reject(resData.reason);
    }
  } catch (e: any) {
    return Promise.reject(e.response.data.message);
  }
};
export const login = async (
  email: string,
  password: string,
  keepLoggedIn: boolean,
) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    const resData = res.data;

    if (resData.status === SUCCESS_STATUS) {
      store.dispatch(setAccessToken(resData.access_token));
      store.dispatch(setUser(resData.user));
      if (keepLoggedIn) {
        localStorage.setItem("user", JSON.stringify(resData.user));
        localStorage.setItem("token", resData.access_token);
      }
      return true;
    } else {
      return Promise.reject(resData.reason);
    }
  } catch (e: any) {
    return Promise.reject(e.response.data.message);
  }
};

export const logout = () => {
  return axios.post(`${API_URL}/logout`).then(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    store.dispatch(setAccessToken(null));
    store.dispatch(setUser(null));
  });
};
