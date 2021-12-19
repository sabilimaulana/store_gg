import GameItem from "@molecules/GameItem";
import { GameItemTypes } from "../../../services/data-types";

interface FeaturedGameProps {
  gameList: readonly GameItemTypes[];
}

function FeaturedGame({ gameList }: FeaturedGameProps) {
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
          {gameList.map((game: GameItemTypes) => (
            <GameItem
              id={game._id}
              key={game?._id}
              title={game?.name}
              category={game?.category?.name}
              thumbnail={game.thumbnail}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedGame;
