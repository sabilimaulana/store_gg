import { UserTypes } from "@services/data-types";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Image from "next/image";
import { useEffect, useState } from "react";
import Input from "../../../components/atoms/Input";
import SideBar from "../../../components/organisms/SideBar";

function EditProfile() {
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
    <section className="edit-profile overflow-auto">
      <SideBar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="position-relative me-20">
                  <div className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                    <Image
                      src="/icon/upload.svg"
                      alt="upload"
                      width={90}
                      height={90}
                    />
                  </div>
                </div>
                <div className="image-upload">
                  <label htmlFor="avatar">
                    <Image
                      src="/icon/upload.svg"
                      alt="upload"
                      width={90}
                      height={90}
                    />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input label="Full Name" value={user.name} />
              </div>
              <div className="pt-30">
                <Input label="Email Address" disabled value={user.email} />
              </div>
              {/* <div className="pt-30">
                <Input label="Phone" />
              </div> */}
              <div className="button-group d-flex flex-column pt-50">
                {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                <button
                  type="submit"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  role="button"
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}

export default EditProfile;
