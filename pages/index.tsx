import { useEffect } from "react";
import { GetServerSideProps, NextPage } from "next";
import AOS from "aos";
import Head from "next/head";
import Navbar from "../components/organisms/Navbar";
import MainBanner from "../components/organisms/MainBanner";
import TransactionStep from "../components/organisms/TransactionStep";
import FeaturedGame from "../components/organisms/FeaturedGame";
import Reached from "../components/organisms/Reached";
import Story from "../components/organisms/Story";
import Footer from "../components/organisms/Footer";
import { GameItemTypes } from "../services/data-types";
import { getFeaturedGame } from "../services/player";

interface HomeProps {
  gameList: GameItemTypes[];
}

const Home: NextPage<HomeProps> = ({ gameList }: HomeProps) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <title>Store GG</title>
      </Head>
      <Navbar />
      <MainBanner />
      <TransactionStep />
      <FeaturedGame gameList={gameList} />
      <Reached />
      <Story />
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { gameList } = await getFeaturedGame();

  return {
    props: {
      gameList,
    },
  };
};

export default Home;
