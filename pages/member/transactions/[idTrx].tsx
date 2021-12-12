import { HistoryTransaction } from "@services/data-types";
import { getTransactionDetail } from "@services/member";
import jwtDecode from "jwt-decode";
import { GetServerSideProps } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import SideBar from "../../../components/organisms/SideBar";
import TransactionDetailContent from "../../../components/organisms/TransactionDetailContent";

interface transactionDetailProps {
  transactionDetail: HistoryTransaction;
}

function TransactionsDetail({ transactionDetail }: transactionDetailProps) {
  return (
    <section className="transactions-detail overflow-auto">
      <SideBar activeMenu="transactions" />
      <TransactionDetailContent data={transactionDetail} />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
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

  if (!params) {
    return {
      props: {},
    };
  }

  const { idTrx } = params;
  const { data, error } = await getTransactionDetail(
    String(idTrx),
    Buffer.from(token, "base64").toString("ascii")
  );

  if (error) {
    return {
      redirect: {
        destination: "/member/transactions",
        permanent: false,
      },
    };
  }

  return {
    props: {
      transactionDetail: data,
    },
  };
};

export default TransactionsDetail;
