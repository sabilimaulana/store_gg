import { useEffect, useState } from "react";
import axios from "axios";
import GameItem from "../../molecules/GameItem";

function FeaturedGame() {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://sbl-store-gg.herokuapp.com/api/v1/players/landingpage"
        );

        setGameList(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <section className="featured-game pt-50 pb-50">
      <div className="container-fluid">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Our Featured
          <br />
          Games This Year
        </h2>
        <div
          className="d-flex flex-row flex-lg-wrap overflow-setting justify-content-lg-between gap-lg-3 gap-4"
          data-aos="fade-up"
        >
          {gameList.map((game) => (
            <GameItem
              key={game?._id}
              title={game?.name}
              category={game?.category?.name}
              thumbnail={`https://sbl-store-gg.herokuapp.com/uploads/${game.thumbnail}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedGame;
