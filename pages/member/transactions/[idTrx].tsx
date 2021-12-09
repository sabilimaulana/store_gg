import jwtDecode from "jwt-decode";
import { GetServerSideProps } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import SideBar from "../../../components/organisms/SideBar";
import TransactionDetailContent from "../../../components/organisms/TransactionDetailContent";

function TransactionsDetail() {
  return (
    <section className="transactions-detail overflow-auto">
      <SideBar activeMenu="transactions" />
      <TransactionDetailContent />
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

export default TransactionsDetail;
