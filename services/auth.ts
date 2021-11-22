import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function setSignUp(data: FormData) {
  const ENDPOINT = `${ROOT_API}/${API_VERSION}/auth/signup`;

  return callAPI({
    url: ENDPOINT,
    data,
    method: "POST",
  });
}

interface SignInDataTypes {
  email: string;
  password: string;
}

export async function setSignIn(data: SignInDataTypes) {
  const ENDPOINT = `${ROOT_API}/${API_VERSION}/auth/signin`;

  return callAPI({
    url: ENDPOINT,
    data,
    method: "POST",
  });
}
