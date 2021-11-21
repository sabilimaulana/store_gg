import { GetServerSideProps } from "next";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { CategoryTypes } from "../../services/data-types";
import { getGameCategories } from "../../services/player";

interface SignUpPhotoProps {
  categories: CategoryTypes[];
}

function SignUpPhoto({ categories }: SignUpPhotoProps) {
  const [favorite, setFavorite] = useState(categories[0]._id);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="" onSubmit={onSubmit}>
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="avatar">
                    <Image src="/icon/upload.svg" width={120} height={120} />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">
                Shayna Anne
              </h2>
              <p className="text-lg text-center color-palette-1 m-0">
                shayna@anne.com
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
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getGameCategories();

  return { props: { categories: data } };
};

export default SignUpPhoto;
