import axios from "axios";

export async function getFeaturedGame() {
  const ROOT_API = process.env.NEXT_PUBLIC_API;
  const API_VERSION = "api/v1";
  const ENDPOINT = "players/landingpage";

  try {
    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${ENDPOINT}`);
    const axiosResponse = response.data;

    return axiosResponse.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getDetailVoucher = async () => null;
