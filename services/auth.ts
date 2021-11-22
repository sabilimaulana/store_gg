import axios from "axios";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function setSignUp(data: FormData) {
  const ENDPOINT = "auth/signup";

  try {
    const response = await axios.post(
      `${ROOT_API}/${API_VERSION}/${ENDPOINT}`,
      data
    );
    const axiosResponse = response.data;

    return axiosResponse.data;
  } catch (error: any) {
    return error.response.data;
  }
}

interface SignInDataTypes {
  email: string;
  password: string;
}

export async function setSignIn(data: SignInDataTypes) {
  const ENDPOINT = "auth/signin";

  try {
    const response = await axios.post(
      `${ROOT_API}/${API_VERSION}/${ENDPOINT}`,
      data
    );
    const axiosResponse = response.data;

    return { error: false, responseData: axiosResponse.data };
  } catch (error: any) {
    return {
      error: true,
      responseData: error.response.data.message || "Internal Server Error",
    };
  }
}
