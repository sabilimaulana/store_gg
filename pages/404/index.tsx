import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

function NotFound() {
  return (
    <>
      <Head>
        <title>Page Not Found | Store GG</title>
      </Head>
      <section className="not-found mx-auto pt-145 pb-md-212 pb-100">
        <div className="container-fluid">
          <div className="text-center">
            <Image
              src="/icon/ic-not-found.svg"
              width={483}
              height={300}
              className="img-fluid"
            />
          </div>
          <div className="pt-70 pb-md-50 pb-150">
            <h2 className="text-4xl fw-bold text-center color-palette-1 mb-10">
              Oops! Not Found
            </h2>
            <p className="text-lg text-center color-palette-1 m-0">
              Halaman yang anda kunjungi
              <br className="d-sm-block d-none" />
              tidak tersedia pada sistem kami.
            </p>
          </div>
          <div className="button-group d-flex flex-column mx-auto">
            <Link href="/">
              <a
                className="btn btn-homepage fw-medium text-lg text-white rounded-pill"
                role="button"
              >
                Homepage
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
