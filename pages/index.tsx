import AppContainer from "@/components/landing/AppContainer";
import Footer from "@/components/landing/Footer";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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

const PageLanding = () => {
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
          className="sm:bg-surface-primary border-outline m-auto flex h-dvh
            w-full max-w-none flex-col justify-start gap-6 rounded-none border-0
            bg-transparent p-3 pt-6 sm:grid sm:h-full sm:grid-cols-2
            sm:justify-between sm:gap-x-4 sm:rounded-xl sm:border sm:p-6
            md:max-w-180"
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
