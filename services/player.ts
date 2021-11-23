import axios from "axios";
import {
  CategoryTypes,
  DetailVoucherTypes,
  GameItemTypes,
  PaymentTypes,
} from "./data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

interface GetFeaturedGameReturnTypes {
  gameList: GameItemTypes[];
  error: boolean;
}

export async function getFeaturedGame(): Promise<GetFeaturedGameReturnTypes> {
  const ENDPOINT = "players/landingpage";

  try {
    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${ENDPOINT}`);
    const axiosResponse = response.data;

    return { gameList: axiosResponse.data, error: false };
  } catch (error) {
    return { gameList: [], error: true };
  }
}

interface GetDetailVoucherResponseTypes {
  detail: DetailVoucherTypes;
  payment: PaymentTypes[];
  error: boolean;
}

export async function getDetailVoucher(
  id: string
): Promise<GetDetailVoucherResponseTypes> {
  const ENDPOINT = `players/${id}/detail`;

  try {
    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${ENDPOINT}`);
    const axiosResponse = response.data;

    return { ...axiosResponse.data, error: false };
  } catch (error) {
    return {
      detail: {
        _id: "",
        name: "",
        category: { _id: "", name: "" },
        isFeatured: false,
        status: "",
        thumbnail: "",
        user: { _id: "", phoneNumber: "", name: "" },
        nominals: [],
      },
      payment: [],
      error: true,
    };
  }
}

export async function getGameCategories(): Promise<CategoryTypes[]> {
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
