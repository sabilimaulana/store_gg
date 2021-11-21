import axios from "axios";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function setSignUp(data: any) {
  const ENDPOINT = "auth/signup";

  try {
    const response = await axios.post(
      `${ROOT_API}/${API_VERSION}/${ENDPOINT}`,
      data
    );
    const axiosResponse = response.data;

    return axiosResponse.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function setSignIn() {
  return null;
}
