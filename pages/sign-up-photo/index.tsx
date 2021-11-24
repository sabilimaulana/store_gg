/* eslint-disable quotes */
/* eslint-disable react/jsx-curly-newline */
import { GetServerSideProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { setSignUp } from "@services/auth";
import { CategoryTypes } from "@services/data-types";
import { getGameCategories } from "@services/player";
import Cookies from "js-cookie";

interface SignUpPhotoProps {
  categories: CategoryTypes[];
}

function SignUpPhoto({ categories }: SignUpPhotoProps) {
  const [favorite, setFavorite] = useState<string>(categories[0]._id);
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState("");
  const [userForm, setUserForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    if (image) {
      data.append("image", image);
    }
    data.append("email", userForm.email);
    data.append("name", userForm.name);
    data.append("password", userForm.password);
    data.append("username", userForm.name);
    data.append("phoneNumber", "0812345678");
    data.append("role", "user");
    data.append("status", "Y");
    data.append("favorite", favorite);

    const { error, message, data: responseData } = await setSignUp(data);
    if (error) return toast.error(message);

    const { token } = responseData;
    const tokenBase64 = btoa(token);
    Cookies.set("token", tokenBase64, { expires: 1 });

    localStorage.removeItem("user-form");
    return router.push("/sign-up-success");
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const img = e.target.files[0];
      setImagePreview(URL.createObjectURL(img));
      setImage(e?.target?.files[0]);
    }
  };

  useEffect(() => {
    const userFormLocal = localStorage.getItem("user-form");

    setUserForm(
      JSON.parse(userFormLocal || `{"email":"","name":"","password":""}`)
    );
  }, []);

  return (
    <>
      <Head>
        <title>Upload Avatar | Store GG</title>
      </Head>
      <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
        <div className="container mx-auto">
          <form action="" onSubmit={onSubmit}>
            <div className="form-input d-md-block d-flex flex-column">
              <div>
                <div className="mb-20">
                  <div className="image-upload text-center">
                    <label htmlFor="avatar">
                      <Image
                        src={imagePreview || "/icon/upload.svg"}
                        className="rounded rounded-circle image-upload"
                        width={120}
                        height={120}
                      />
                    </label>
                    <input
                      id="avatar"
                      type="file"
                      name="avatar"
                      accept="image/png, image/jpeg"
                      onChange={onChangeFile}
                      // required
                    />
                  </div>
                </div>
                <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                  {userForm.name}
                </h2>
                <p className="text-lg text-center color-palette-1 m-0">
                  {userForm.email}
                </p>
                <div className="pt-50 pb-50">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label
                    htmlFor="category"
                    className="form-label text-lg fw-medium color-palette-1 mb-10"
                  >
                    Favorite Game
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select d-block w-100 rounded-pill text-lg"
                    aria-label="Favorite Game"
                    onChange={(e) => setFavorite(e.target.value)}
                    value={favorite}
                    required
                  >
                    {categories?.map((category: CategoryTypes) => (
                      <option value={category._id} key={category._id}>
                        {category?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="button-group d-flex flex-column mx-auto">
                <button
                  className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                  type="submit"
                >
                  Create My Account
                </button>

                <a
                  className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                  href="/"
                  role="button"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getGameCategories();

  return { props: { categories: data } };
};

export default SignUpPhoto;
