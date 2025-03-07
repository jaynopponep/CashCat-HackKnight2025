import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Image from "next/image";
import SignUp from "./Login/SignUp";

export default function Home() {
  return (
    <div className=" w-full m-0  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header></Header>
      <footer>
      <Footer></Footer>
      </footer>
      
    </div>
  );
}
