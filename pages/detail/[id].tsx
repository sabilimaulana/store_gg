import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Footer from "../../components/organisms/Footer";
import Navbar from "../../components/organisms/Navbar";
import TopUpForm from "../../components/organisms/TopUpForm";
import TopUpItem from "../../components/organisms/TopUpItem";
import { getDetailVoucher } from "../../services/player";

function Detail() {
  const { query, isReady } = useRouter();
  const [dataItem, setDataItem] = useState({
    name: "",
    thumbnail: "",
    category: {
      name: "",
    },
  });

  const getVoucherDetailApi = useCallback(async (id: string) => {
    const data = await getDetailVoucher(id);
    setDataItem(data?.detail);
  }, []);

  useEffect(() => {
    if (isReady) {
      getVoucherDetailApi(String(query?.id));
    } else {
      console.log("Router belum tersedia");
    }
  }, [isReady]);

  return (
    <>
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
              <TopUpForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Detail;
