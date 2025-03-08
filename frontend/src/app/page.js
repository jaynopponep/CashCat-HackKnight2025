import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Image from "next/image";
import "./style.css"
import { Cat } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      <Header></Header>
      <div className="hero-container">
        <div className="hero-text">
          <h2>Welcome to <div className="hero-text-bold">CashCat</div></h2>
          <p>Experience financial gains with smart transaction tracking and budgeting tools</p>
        </div>
        <Cat size={256} color="#f00d09"></Cat>
        

        
      </div>
      <Footer></Footer>
      
      
    </div>
  );
}


