import { GetServerSideProps } from "next";
import Button from "@/components/common/Button";
import cn from "@/utils/helpers/cn";
import Link from "next/link";

const Home = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/send",
      permanent: false,
    },
  };
};

export default Home;
