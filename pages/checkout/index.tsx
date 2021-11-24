import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import jwtDecode from "jwt-decode";
import { UserTypes } from "services/data-types";
import CheckoutItem from "@organism/CheckoutItem";
import CheckoutDetail from "@organism/CheckoutDetail";
import CheckoutConfirmation from "@organism/CheckoutConfirmation";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

interface CheckoutProps {
  user: UserTypes;
}

const Checkout: NextPage<CheckoutProps> = ({ user }: CheckoutProps) => {
  console.log(user);

  return (
    <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <div className="container-fluid">
        <div className="logo text-md-center text-start pb-50">
          <Link href="/">
            <a>
              <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
            </a>
          </Link>
        </div>
        <div className="title-text pt-md-50 pt-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
          <p className="text-lg color-palette-1 mb-0">
            Waktunya meningkatkan cara bermain
          </p>
        </div>
        <CheckoutItem />
        <hr />
        <CheckoutDetail />
        <CheckoutConfirmation />
      </div>
    </section>
  );
};

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

  return {
    props: {
      user: player,
    },
  };
};

export default Checkout;
