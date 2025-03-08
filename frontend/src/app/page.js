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
        <Cat className="Meow" size={256} strokeWidth= {1.5} color="#f00d09"></Cat>
        <div className="quirky-container">
          <svg className="quirky" version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="80px" height="40px" viewBox="0 0 300.000000 116.000000"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,116.000000) scale(0.100000,-0.100000)"
              fill="#f00e09" stroke="none">
              <path d="M2640 967 c-62 -31 -24 -83 85 -117 41 -13 75 -27 75 -31 0 -11 -129 -113 -180 -142 -65 -37 -132 -50 -194 -37 -67 14 -98 43 -141 135 -36 76 -63 103 -124 123 -82 28 -197 2 -312 -73 -37 -24 -136 -110 -220 -192 -181 -176 -243 -226 -324 -264 -90 -43 -169 -36 -194 18 -6 13 -11 61 -11 107 0 149 -47 239 -153 290 -211 103 -504 -48 -751 -384 -71 -96 -140 -244 -141 -300 0 -43 1 -45 32 -48 28 -3 34 2 59 45 171 297 366 496 547 557 62 21 150 20 194 0 57 -28 67 -54 73 -184 5 -93 10 -124 29 -164 44 -90 147 -131 265 -107 120 25 214 89 416 286 180 175 223 211 304 254 111 59 184 39 216 -59 18 -54 70 -114 123 -139 140 -68 301 -36 427 85 l60 57 0 -82 c0 -92 16 -141 53 -165 58 -39 85 13 97 186 6 73 14 159 18 191 15 99 -2 113 -167 146 -120 24 -128 25 -161 8z"/>
            </g>
          </svg>
          <span className="quirky-text">Ozzy</span>
        </div>
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
        <Card text={"Share Your Success With Friends"} desc={"Be the first to let your friends and family find out how successful you were in budgetting"}></Card>
        </div>
        </div>
      <Footer></Footer>


      
      
    </div>
  );
}


