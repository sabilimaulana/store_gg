import jwtDecode from "jwt-decode";
import { GetServerSideProps } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import OverviewContent from "../../components/organisms/OverviewContent";
import SideBar from "../../components/organisms/SideBar";

function Member() {
  return (
    <section className="overview overflow-auto">
      <SideBar activeMenu="overview" />
      <OverviewContent />
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

  return {
    props: {
      user: player,
    },
  };
};

export default Member;
