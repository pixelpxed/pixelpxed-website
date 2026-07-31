import Button from "@/components/common/Button";
import AppContainer from "@/components/landing/AppContainer";
import Footer from "@/components/landing/Footer";
import { createClient } from "@supabase/supabase-js";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";

const APPS_LIST = [
  {
    icon: "package_2",
    title: "Send",
    description: "Real-time link sharing lobbies",
    redirect: "/send",
    openInNew: false,
  },
  {
    icon: "nest_farsight_seasonal",
    title: "Timetable (Legacy)",
    description: "Online classes one tap away",
    redirect: `${process.env.NEXT_PUBLIC_LEGACY_SITE_URL}/timetable/`,
    openInNew: true,
  },
  {
    icon: "draw",
    title: "Notetaker (Legacy)",
    description: "Your local exportable notes",
    redirect: `${process.env.NEXT_PUBLIC_LEGACY_SITE_URL}/notetaker/`,
    openInNew: true,
  },
];

const supabase = await createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISH_KEY ?? "",
);

const PageLanding = () => {
  const [userWave, setUserWave] = useState<boolean>(true);
  const [waveCount, setWaveCount] = useState<number>(0);
  const [userWaveChecked, setUserWaveChecked] = useState<boolean>(false);
  const [busySubmitWave, setBusySubmitWave] = useState<boolean>(false);

  const getGlobalWavedCount = async () => {
    const { count, error } = await supabase
      .from("landing_waves")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error(error);
    } else {
      setWaveCount(count ?? 0);
    }

    return setUserWaveChecked(true);
  };
  const getUserWavedStatus = async () => {
    if (localStorage.getItem("pixelpxed-landing-waveUUID") == "")
      return setUserWave(false);

    const { error } = await supabase
      .from("landing_waves")
      .select()
      .eq("id", localStorage.getItem("pixelpxed-landing-waveUUID"))
      .single();

    if (error) {
      return setUserWave(false);
    } else {
      return setUserWave(true);
    }
  };
  const handleSubmitWave = async () => {
    setBusySubmitWave(true);

    const { data, error } = await supabase
      .from("landing_waves")
      .insert({})
      .select()
      .single();

    if (error) {
      alert(JSON.stringify(error));
      return setBusySubmitWave(false);
    } else {
      if (typeof window != "undefined") {
        localStorage.setItem("pixelpxed-landing-waveUUID", data.id);
      }
      getUserWavedStatus();
      getGlobalWavedCount();
      return setBusySubmitWave(false);
    }
  };

  useEffect(() => {
    getUserWavedStatus();
    getGlobalWavedCount();
  }, []);

  return (
    <>
      <Head>
        <title>pixelpxed</title>
        <link
          rel="shortcut icon"
          href="/favicons/favicon.png"
          type="image/png"
        />
      </Head>
      <main className="bg-background flex h-full min-h-dvh p-0 sm:p-2">
        <div
          className="sm:bg-surface-primary border-outline m-0 flex w-full
            max-w-180 flex-col justify-start gap-6 rounded-xl border-0
            bg-transparent p-3 pt-6 sm:m-auto sm:grid sm:grid-cols-2
            sm:justify-between sm:gap-x-4 sm:border sm:p-6"
        >
          <div
            className="flex flex-col justify-start gap-4 text-center
              sm:text-left [&>div]:flex [&>div]:flex-col"
          >
            <div className="gap-2">
              <Image
                src={"/img/landing/pixelpxed.jpeg"}
                width={320}
                height={320}
                alt="pixelpxed"
                className="mx-auto block aspect-square w-24 rounded-full
                  sm:mx-0"
              />
              <p>
                <span className="font-bold">Metawat&nbsp;R.</span>{" "}
                <span className="opacity-50">(@pixelpxed)</span>
              </p>
            </div>
            <div className="gap-1">
              <p>
                <Balancer>
                  Self-taught developer interested on things web-related. But
                  I’m also a minimalist UI/UX designer with the balance on
                  functionality in mind also.
                </Balancer>
              </p>
              <p>
                Computer Science student at{" "}
                <Link
                  href="https://www.chula.ac.th"
                  target="_blank"
                  className="text-blue-500 dark:text-blue-400"
                >
                  Chulalongkorn&nbsp;U.
                </Link>
              </p>
            </div>
            {userWaveChecked && (
              <Button
                appearance={userWave ? "tonal" : "filled"}
                icon={userWave ? "check_small" : "waving_hand"}
                className="w-full max-w-none sm:max-w-max"
                onClick={() => handleSubmitWave()}
                busy={busySubmitWave}
                busyWithText={true}
                disabled={userWave}
              >
                {waveCount == 0
                  ? `Wave to Metawat!`
                  : userWave
                    ? waveCount == 1
                      ? `You waved to Metawat!`
                      : `You and ${waveCount - 1} other${waveCount == 2 ? "" : "s"} waved!`
                    : `Wave with ${waveCount} other people!`}
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-4 sm:row-span-2">
            <div className="flex flex-col gap-1.5">
              <p className="text-xs opacity-50">Apps</p>
              <div className="flex flex-col gap-1">
                {APPS_LIST.map((item, idx) => {
                  return (
                    <AppContainer
                      key={idx}
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                      redirect={item.redirect}
                      openInNew={item.openInNew ?? false}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs opacity-50">Writings</p>
              <div
                className="border-outline grid h-40 place-items-center
                  rounded-md border"
              >
                <p className="text-xs opacity-50">There aren't any... yet.</p>
              </div>
            </div>
          </div>

          <Footer className="m-0 text-center sm:mt-auto sm:text-left" />
        </div>
      </main>
    </>
  );
};

export default PageLanding;
