import Button from "@/components/Button";
import cn from "@/utils/helpers/cn";
import Link from "next/link";

const Home = () => {
  return (
    <>
      {/* <div
        className={cn(
          "m-3 flex w-sm flex-col gap-2 rounded-lg border border-slate-200 p-3",
        )}
      >
        <h1 className="text-xl font-medium">Design and Develop.</h1>
        <div className="flex flex-col gap-1">
          <p>
            Undeniably lazy, self-taught developer. Focused on building with
            web-technologies.
          </p>
          <p>
            Also a minimalist UI/UX designer who values functionality as much as
            aesthetics.
          </p>
          <p>
            I’m Metawat Rojniweth, also known as @pixelpxed, nice to see you!
          </p>
        </div>
        <Button>Hello, Metawat!</Button>
      </div> */}
      <div className="flex h-dvh w-dvw flex-col">
        <div className="p-2">
          <p>Landing is made-in-progress, so please wait.</p>
          <p className="mb-2">
            Apps built with new architecture (Next.js):{" "}
            <Link href="/send" className="text-blue-500">
              Send (App)
            </Link>
          </p>
          <p>
            <Link
              href="https://pxedition.vercel.app/"
              className="text-blue-500"
            >
              Old landing/site (Made with Vanilla):
            </Link>
          </p>
        </div>
        <iframe src="https://pixelpxed.vercel.app/" className="grow" />
      </div>
    </>
  );
};

export default Home;
