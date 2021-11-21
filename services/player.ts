import axios from "axios";
import { GameItemTypes } from "./data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function getFeaturedGame(): Promise<GameItemTypes[]> {
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

export async function getDetailVoucher(id: string) {
  const ENDPOINT = `players/${id}/detail`;

  try {
    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${ENDPOINT}`);
    const axiosResponse = response.data;

    return axiosResponse.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getGameCategories() {
  const ENDPOINT = "players/category";

  try {
    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${ENDPOINT}`);
    const axiosResponse = response.data;

    return axiosResponse.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
