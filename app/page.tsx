'use client'

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";
import { MdArrowForward } from "react-icons/md";
import Banner from "./components/Banner";
import Start from "./components/Start";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Banner />
      <Header />
      <div className="relative sm:w-[85%] flex flex-col items-center justify-center mx-auto container mt-10 h-[70vh]">
        <div className="absolute left-2/5 top-1/4 -translate-x-1/2 -translate-y-1/2 gradient opacity-60"></div>
        <h1 className="text-neutral-200 text-center text-4xl xs:text-6xl font-bold leading-tight z-10">
          Organize ideas, simplify <br />
          <span className="bg-gradient-to-r from-blueLight to-green bg-clip-text text-transparent">
            your work
          </span>
        </h1>
        <p className="w-[70%] sm:w-[55%] text-center mt-7 z-10 text-neutral-300">
          <span className="text-xl font-semibold">&ldquo;</span>Organize your notes efficiently, keeping everything at your fingertips and ensuring nothing is forgotten, bringing your achievements closer.
          <span className="text-xl font-semibold">&ldquo;</span>
        </p>
        <div className="flex items-center gap-7 mt-5 z-10">
          <div className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue to-greenMedium p-[2.25px] font-semibold text-white no-underline">
            <Button className="relative w-full overflow-hidden rounded-full bg-neutral-900 px-10 py-[0.875rem] text-center transition-all duration-300 hover:bg-neutral-800 hover:text-white hover:opacity-90">
              Get Started <MdArrowForward />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="absolute h-full w-1/4 bg-white/20 blur-md animate-shine"></span>
              </span>
            </Button>
          </div>
        </div>
      </div>
      <section className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-center items-center my-10 w-full">
        <div className="sm:w-1/2">
          <div className="p-10">
            <Image
              src={'/dalle.png'}
              alt="logo"
              width={550}
              height={550}
              className="object-cover rounded-[0.5rem]"
            />
          </div>
        </div>
        <div className="sm:w-1/2">
          <div className="p-10">
            <h5 className="font-mono font-semibold">DALL•E</h5>
            <h1 className="text-4xl font-bold text-neutral-200 my-4">Transform Ideas into Images with Artificial Intelligence</h1>
            <p className="text-neutral-300">A creative revolution that transforms images specifically into stunning images through AI. With just a few words, you can bring unique concepts to life, exploring limitless possibilities. From surreal illustrations to full-fledged art, DALL·E pushes the boundaries of imagination and puts the power of digital creation at your fingertips.</p>
            <div className="w-4/5 mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue to-greenMedium p-[2.25px] font-semibold text-white no-underline">
              <Button className="relative w-full overflow-hidden rounded-full bg-neutral-900 px-7 py-[0.875rem] text-center transition-all duration-500 hover:bg-neutral-800 hover:text-white hover:opacity-90" onClick={() => router.push("https://openai.com/dall-e-2/")}>
                Click to find out more<MdArrowForward />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="absolute h-full w-1/5 bg-white/20 blur-md animate-shine"></span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Start />
      <Footer />
    </>
  );
}