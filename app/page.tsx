import Header from "./components/Header";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";
import { MdArrowForward } from "react-icons/md";
import Banner from "./components/Banner";

export default function Home() {
  return (
    <>
      <Banner />
      <Header />
      <div className="relative w-[85%] flex flex-col items-center mx-auto container mt-10 py-20">
        <div className="absolute left-2/5 top-1/4 -translate-x-1/2 -translate-y-1/2 gradient opacity-60"></div>
        <h1 className="text-center text-4xl xs:text-6xl font-bold leading-tight z-10">
          Organize your ideas, simplify <br />
          <span className="bg-gradient-to-r from-blueLight to-green bg-clip-text text-transparent">
            your life
          </span>
        </h1>
        <p className="w-[60%] text-center mt-7 z-10">
          <span className="text-xl font-semibold">"</span>Organize your notes efficiently, keeping everything at your fingertips and ensuring nothing is forgotten, bringing your achievements closer.
          <span className="text-xl font-semibold">"</span>
        </p>
        <div className="flex items-center gap-7 mt-5 z-10">
          <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue to-greenMedium p-[2.25px] font-semibold text-white no-underline">
            <Button className="relative w-full overflow-hidden rounded-full bg-neutral-900 px-7 py-[0.875rem] text-center transition-all duration-300 hover:bg-neutral-800 hover:text-white hover:opacity-90">
              Get Started <MdArrowForward />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="absolute h-full w-1/4 bg-white/20 blur-md animate-shine"></span>
              </span>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}