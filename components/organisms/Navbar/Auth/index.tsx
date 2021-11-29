import Image from "next/image";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>("");

  const router: NextRouter = useRouter();

  const onLogout = () => {
    Cookies.remove("token");
    setAvatar("");
    setIsLogin(false);
    router.push("/");
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const { player }: any = jwtDecode(atob(token));
      setAvatar(player.avatar);
      setIsLogin(true);
    }
  }, []);

  if (isLogin) {
    return (
      <li className="nav-item my-auto dropdown d-flex">
        <div className="vertical-line d-lg-block d-none" />
        <div>
          <a
            className="dropdown-toggle ms-lg-40"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Image
              src={avatar || "/img/avatar.png"}
              className="rounded-circle"
              width={40}
              height={40}
              alt="avatar"
            />
          </a>

          <ul
            className="dropdown-menu border-0"
            aria-labelledby="dropdownMenuLink"
          >
            <li>
              <Link href="/member">
                <a className="dropdown-item text-lg color-palette-2">
                  My Profile
                </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a className="dropdown-item text-lg color-palette-2">Wallet</a>
              </Link>
            </li>
            <li>
              <Link href="/member/edit-profile">
                <a className="dropdown-item text-lg color-palette-2">
                  Account Settings
                </a>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="dropdown-item text-lg color-palette-2"
                onClick={onLogout}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li className="nav-item my-auto">
      <Link href="/sign-in">
        <a
          className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
          role="button"
        >
          Sign In
        </a>
      </Link>
    </li>
  );
}

export default Auth;
