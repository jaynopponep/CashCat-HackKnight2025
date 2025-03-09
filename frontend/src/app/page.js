"use client"
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Image from "next/image";
import "./style.css"
import { Cat } from 'lucide-react';
import { CircleDollarSign } from 'lucide-react';
import Card from "@/component/Card";
import { useState, useEffect } from "react";


export default function Home() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prev) => [
        ...prev,
        { id: Math.random(), left: Math.random() * 100 }, 
      ]);
      
      
      setTimeout(() => {
        setCoins((prev) => prev.slice(1));
      }, 1000);
    }, 500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white">
      <Header></Header>
      <div className="hero-container">
        <div className="hero-text">
          <h2>Welcome to <div className="hero-text-bold">CashCat</div></h2>
          {coins.map((coin) => (
            <span
              key={coin.id}
              className="coin absolute text-yellow-400"
              style={{ left: `${coin.left}%`, top: "-10px" }}
            >
              <CircleDollarSign></CircleDollarSign>
            </span>
      ))}
          <p>Experience financial gains with smart transaction tracking and budgeting tools</p>
        </div>
        <Image width="300" height="350" src="/Ozzy.png" alt="Ozzy"></Image>
        
      </div>
      
      <div className="about-container">
        <div className="about-text">
        <h2>Keep Ozzy Happy, Save More Money</h2>
        <p>CashCat is a free money-saving and financial 
          advising application that treats your financial 
          decisions like a game. With Ozzy, your own personal 
          virtual pet cat, to motivate you and a strong social network 
          to inspire you, CatCash can help you achieve your financial goals.</p>
      
        </div>
        <div className="about-cards">
        <Card text={"Track Your Financial Habits and Goals"} desc={"Stay accountable by tracking and managing your spending and weekly goals"}></Card>
        <Card text={"Keep Ozzy Happy"} desc={"Stick your budget goals to ensure Ozzy's happiness. Get out of line, and he will be sad"}></Card>
        <Card text={"Share Your Success With Friends"} desc={"Be the first to let your friends and family find out how successful you were in budgeting"}></Card>
        </div>
        </div>
      <Footer></Footer>


      
      
    </div>
  );
}


