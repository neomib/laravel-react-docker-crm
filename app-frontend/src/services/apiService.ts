export const API_URL = "/app-service/api";
export const SUCCESS_STATUS = "success";
export const ERROR_STATUS = "error";

export const apiHandler = async (promise: Promise<any>) => {
  try {
    const res = await promise;
    const resData = res.data;

    if (resData.status === SUCCESS_STATUS) {
      return resData;
    } else {
      return Promise.reject(resData.reason);
    }
  } catch (e: any) {
    return Promise.reject(e.response.data.message);
  }
};
