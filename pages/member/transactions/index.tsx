import SideBar from "@organisms/SideBar";
import TransactionsContent from "@organisms/TransactionsContent";
import jwtDecode from "jwt-decode";
import { GetServerSideProps } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

function Transactions() {
  return (
    <section className="transactions overflow-auto">
      <SideBar activeMenu="transactions" />
      <TransactionsContent />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token }: NextApiRequestCookies = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const { player }: any = jwtDecode(
    Buffer.from(token, "base64").toString("ascii")
  );

  if (!player) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Transactions;
