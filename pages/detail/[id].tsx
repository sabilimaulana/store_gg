import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Footer from "@organisms/Footer";
import Navbar from "@organisms/Navbar";
import TopUpForm from "@organisms/TopUpForm";
import TopUpItem from "@organisms/TopUpItem";
import { NominalTypes, PaymentTypes } from "@services/data-types";
import { getDetailVoucher, getFeaturedGame } from "@services/player";
import { useEffect } from "react";

interface DetailProps {
  nominals: NominalTypes[];
  payments: PaymentTypes[];
  dataItem: {
    name: string;
    thumbnail: string;
    category: {
      name: string;
    };
  };
}

function Detail({ nominals, payments, dataItem }: DetailProps) {
  useEffect(() => {
    localStorage.setItem("data-item", JSON.stringify(dataItem));
  });

  return (
    <>
      <Head>
        <title>{`${dataItem.name} | Store GG`}</title>
      </Head>
      <Navbar />
      <section className="detail pt-lg-60 pb-50">
        <div className="container-xxl container-fluid">
          <div className="detail-header pb-50">
            <h2 className="text-4xl fw-bold color-palette-1 text-start mb-10">
              Top Up
            </h2>
            <p className="text-lg color-palette-1 mb-0">
              Perkuat akun dan jadilah pemenang
            </p>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start">
              <TopUpItem type="mobile" data={dataItem} />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
              {/* <!-- Desktop: Game title --> */}
              <TopUpItem type="desktop" data={dataItem} />
              <hr />
              <TopUpForm nominals={nominals} payments={payments} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { gameList } = await getFeaturedGame();
  const paths = gameList.map((item) => ({ params: { id: item._id } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params || { id: "" };

  if (!id) {
    return {
      redirect: {
        destination: "/404",
      },
      props: {},
    };
  }
  const data = await getDetailVoucher(String(id));

  return {
    props: {
      dataItem: data?.detail,
      nominals: data?.detail?.nominals,
      payments: data.payment,
    },
  };
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const data = await getDetailVoucher(String(ctx.query.id));
//   if (data.error) {
//     const { res } = ctx;
//     res.setHeader("location", "/404");
//     res.statusCode = 302;
//     res.end();
//     return { props: {} };
//   }

//   return {
//     props: {
//       dataItem: data?.detail,
//       nominals: data?.detail?.nominals,
//       payments: data.payment,
//     },
//   };
// };

export default Detail;
