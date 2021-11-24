import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import SignUpForm from "@organisms/SignUpForm";

function SignUp() {
  return (
    <>
      <Head>
        <title>Sign Up | Store GG</title>
      </Head>
      <section className="sign-up mx-auto pt-lg-100 pb-lg-100 pt-30 pb-47">
        <div className="container mx-auto">
          <div className="pb-50">
            <Link href="/">
              <a className="navbar-brand">
                <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
              </a>
            </Link>
          </div>
          <SignUpForm />
        </div>
      </section>
    </>
  );
}

export default SignUp;
