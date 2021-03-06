import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import Cookies from "js-cookie";

interface CallApiParameter extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
}: CallApiParameter) {
  let headers: AxiosRequestHeaders = {};

  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const jwtToken = atob(Cookies.get("token") || "");
    headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
  }

  const response = await axios({
    url,
    method,
    data,
    headers,
  }).catch((error: any) => error?.response);
  if (response.status >= 300) {
    const res = {
      error: true,
      message: response.data.message || "Internal Server Error",
      data: null,
    };
    return res;
  }

  const res = {
    error: false,
    message: "success",
    data: response.data.data,
  };
  return res;
}
