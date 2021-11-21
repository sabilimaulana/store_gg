import { FormEvent, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const className = {
    label: cx("form-label text-lg fw-medium color-palette-1 mb-10"),
    input: cx("form-control rounded-pill text-lg"),
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const userForm = { name, email, password };
    localStorage.setItem("user-form", JSON.stringify(userForm));
    router.push("sign-up-photo");
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign Up</h2>
      <p className="text-lg color-palette-1 m-0">
        Daftar dan bergabung dengan kami
      </p>
      <div className="pt-50">
        <label htmlFor="name" className={className.label}>
          Full Name
        </label>
        <input
          type="text"
          className={className.input}
          id="name"
          aria-describedby="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="pt-30">
        <label htmlFor="email" className={className.label}>
          Email Address
        </label>
        <input
          type="email"
          className={className.input}
          id="email"
          aria-describedby="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="pt-30">
        <label htmlFor="password" className={className.label}>
          Password
        </label>
        <input
          type="password"
          className={className.input}
          id="password"
          aria-describedby="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
          type="submit"
        >
          Continue
        </button>

        <a
          className="btn btn-sign-in fw-medium text-lg color-palette-1 rounded-pill"
          href="/sign-in"
          role="button"
        >
          Sign In
        </a>
      </div>
    </form>
  );
}

export default SignUpForm;
