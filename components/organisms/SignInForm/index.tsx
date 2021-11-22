import { FormEvent, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { setSignIn } from "../../../services/auth";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const reqData = { email, password };

    const { error, message, data } = await setSignIn(reqData);
    if (error) {
      // toast.error("Email or password are wrong.");
      toast.error(message);
      return;
    }

    const { token } = data;
    const tokenBase64 = btoa(token);
    Cookies.set("token", tokenBase64, { expires: 1 });
    router.push("/");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
        <p className="text-lg color-palette-1 m-0">
          Masuk untuk melakukan proses top up
        </p>
        <div className="pt-50">
          <label
            htmlFor="email"
            className="form-label text-lg fw-medium color-palette-1 mb-10"
          >
            Email Address
          </label>
          <input
            type="email"
            className="form-control rounded-pill text-lg"
            id="email"
            name="email"
            aria-describedby="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="pt-30">
          <label
            htmlFor="password"
            className="form-label text-lg fw-medium color-palette-1 mb-10"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control rounded-pill text-lg"
            id="password"
            name="password"
            aria-describedby="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group d-flex flex-column mx-auto pt-50">
          <button
            className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
            type="submit"
          >
            Continue to Sign In
          </button>
          <Link href="/sign-up">
            <a
              className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill"
              role="button"
            >
              Sign Up
            </a>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default SignInForm;
