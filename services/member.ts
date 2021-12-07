import callAPI from "config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = "api/v1";

export async function getMemberOverview() {
  const ENDPOINT = `${ROOT_API}/${API_VERSION}/players/dashboard`;

  return callAPI({
    url: ENDPOINT,
    method: "GET",
    token: true,
  });
}

export async function getMemberTransactions(valueParams: string) {
  let params = "";
  if (valueParams === "all") {
    params = "";
  } else {
    params = `?status=${valueParams}`;
  }

  const ENDPOINT = `${ROOT_API}/${API_VERSION}/players/history/${params}`;

  return callAPI({
    url: ENDPOINT,
    method: "GET",
    token: true,
  });
}
