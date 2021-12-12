import Image from "next/image";
import { UserTypes } from "@services/data-types";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState<Partial<UserTypes>>({
    avatar: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const { player }: any = jwtDecode(atob(token));
      setUser(player);
    }
  }, []);

  return (
    <div className="user text-center pb-50 pe-30">
      <Image
        src={user.avatar || "/img/avatar.png"}
        width={90}
        height={90}
        className="img-fluid mb-20 rounded-circle"
        alt="Avatar"
      />
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
      <p className="color-palette-2 m-0">{user.email}</p>
    </div>
  );
}

export default Profile;
