"use client";
import Link from "next/link";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Image from "next/image";
import "./style.css";
import { CircleDollarSign } from "lucide-react";
import Card from "@/component/Card";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [kittyVisible, setKittyVisible] = useState(false);
  const [financeVisible, setFinanceVisible] = useState(false);
  const [dollarVisible, setDollarVisible] = useState(false);
  const kittySectionRef = useRef(null);
  const financeSectionRef = useRef(null);
  const dollarSectionRef = useRef(null);
  
  const RotatingBanner = () => {
    return (
      <div className="rotating-banner">
      <div className="rotating-banner-content">
        <span className="rotating-content">CASH CAT IS COOL</span>
        <span className="rotating-content"> CASH CAT IS COOL</span>
        <span className="rotating-content">CASH CAT IS COOL</span>
        <span className="rotating-content">CASH CAT IS COOL</span>
        <span className="rotating-content"> CASH CAT IS COOL</span>
        <span className="rotating-content">CASH CAT IS COOL</span>
        </div>
      </div>
    );
  };
  
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

  useEffect(() => {
<<<<<<< HEAD
    // Create a single observer for all sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check which section is being observed
          if (entry.target === kittySectionRef.current && entry.isIntersecting) {
            setKittyVisible(true);
          }
          if (entry.target === financeSectionRef.current && entry.isIntersecting) {
            setFinanceVisible(true);
          }
          if (entry.target === dollarSectionRef.current && entry.isIntersecting) {
            setDollarVisible(true);
          }
        });
      },
      { 
        threshold: 0.1,  // Trigger when at least 10% is visible
        rootMargin: "0px 0px -50px 0px" // Adjust rootMargin for earlier triggering
      }
    );

    // Observe all sections
    if (kittySectionRef.current) {
      observer.observe(kittySectionRef.current);
    }
    
    if (financeSectionRef.current) {
      observer.observe(financeSectionRef.current);
    }
    
    if (dollarSectionRef.current) {
      observer.observe(dollarSectionRef.current);
    }

    return () => {
      if (kittySectionRef.current) {
        observer.unobserve(kittySectionRef.current);
      }
      if (financeSectionRef.current) {
        observer.unobserve(financeSectionRef.current);
      }
      if (dollarSectionRef.current) {
        observer.unobserve(dollarSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full bg-white">
      <Header />
      <div className="hero-container">
        <div className="hero-text">
          <h2>
            Welcome to <div className="hero-text-bold">CashCat</div>
          </h2>
          {coins.map((coin) => (
            <span
              key={coin.id}
              className="coin absolute text-yellow-400"
              style={{ left: `${coin.left}%`, top: "-10px" }}
            >
              <CircleDollarSign />
            </span>
          ))}
          <p className="finance">
            Experience financial gains with smart transaction tracking and
            budgeting tools
          </p>
        </div>
        <div className="bounce-animation">
          <Image width="300" height="350" src="/Ozzy.png" alt="Ozzy" />
        </div>
      </div>

      
      <div className="about-container">
        <div className="about-text">
          <h2>Keep Ozzy Happy, Save More Money</h2>
        </div>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="about-cards">
        <Card text={"Track Your Financial Habits and Goals"} desc={"Stay accountable by tracking and managing your spending and weekly goals"}></Card>
        <Card text={"Keep Ozzy Happy"} desc={"Stick your budget goals to ensure Ozzy's happiness. Get out of line, and he will be sad"}></Card>
        <Card text={"Share Your Success With Friends"} desc={"Be the first to let your friends and family find out how successful you were in budgeting"}></Card>
        </div>
        </div>
      
=======
=======
>>>>>>> 74a78af (Save changes before rebase)
=======

>>>>>>> 315b8ab (This is the new frontend page)
        <RotatingBanner />
>>>>>>> 0a95aad (New homepage)

       

       

        {/* Kitty Section with improved positioning and visibility handling */}

        <div 
          ref={kittySectionRef} 
          className={`kitty-section ${kittyVisible ? "visible" : ""}`}
        >
          <div className="kitty-content">
            <div className="kitty-text">
              <div>
                <h3 className="kitty-heading">About CashCat</h3> 
              </div>
              <p>
                CashCat is a free money-saving and financial advising application
                that treats your financial decisions like a game. With Ozzy, your own
                personal virtual pet cat, to motivate you and a strong social network
                to inspire you, CatCash can help you achieve your financial goals.
              </p>
              <button className="kitty-button">Learn More</button>
            </div>
            <div className="kitty-image">
              <Image width="300" height="350" src="/images/screenshot2.png" alt="screenshot" />
            </div>
          </div>
        </div>

        {/* Finance Section with improved positioning and visibility handling */}
        <div 
          ref={financeSectionRef} 
          className={`finance-section ${financeVisible ? "visible" : ""}`}
        >
          <div className="finance-content">

            <div className="finance-image">
              <Image width="300" height="350" src="/images/collab.png" alt="screenshot" />
            </div>
            <div className="finance-text">

              <div className="finance-image">
                <Image width="300" height="350" src="/images/collab.png" alt="screenshot" />
              </div>
              <div className="finance-text">

              <div>
                <h3 className="finance-heading">Connect & Celebrate Your Financial Journey</h3> 
              </div>
              <p>
                Share your financial victories and milestones with the CashCat community.
                Post weekly achievements, celebrate hitting savings goals, and get inspired by others on the same path. 
                Whether you've stuck to your budget, paid down debt, or reached a savings milestone, our social platform lets you document your progress, receive encouragement, and motivate others. 
                Build connections while building wealth—because financial success is always better when shared.
              </p>

              <Link href="/signup">
                <button className="finance-button">Get Started</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dollar Section - Updated to match Kitty Section structure */}
        <div 
          ref={dollarSectionRef} 
          className={`dollar-section ${dollarVisible ? "visible" : ""}`}
        >
          <div className="dollar-content">
            <div className="dollar-text">
              <div>
                <h3 className="dollar-heading">TRACK EVERY DOLLAR</h3> 
              </div>
              <p>
                Keep complete control of your finances with CashCat's transaction tracker. Every purchase is automatically logged and categorized, giving you a clear view of where your money goes. 
                Our intuitive dashboard highlights spending patterns, sends alerts when you approach budget limits, and visualizes your progress. 
                Make smarter financial decisions and watch your savings grow while Ozzy celebrates each milestone along the way.
              </p>
              <button className="dollar-button">START NOW</button>
            </div>
            <div className="dollar-image">
              <Image width="300" height="350" src="/images/screen3.png" alt="screenshot" />
            </div>
          </div>
        </div>

              <button className="finance-button">Get Started</button>
            </div>
          </div>
        </div>

   
  );
}