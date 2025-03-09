import React from 'react'
import "../style.css"
import Header from '@/component/Header';
import Image from 'next/image';

export default function Team() {
  return (
<div className= "team-container">
    <Header></Header>
  <h1>Meet the Team</h1>
  <div className='team-tiles-container'>
    <div className='team-top'>
    <div className='team-tiles'>
    <Image src={"/Jay.png"} width={300} height={300} alt='Jay'/>
    Jay Noppone P.
    </div>
    <div className='team-tiles'>
        <Image src={"/Arbab.png"} width={300} height={300} alt='Arbab'/>
        Arbab Husain
    </div>
    </div>
    <div className='team-top'>
    <div className='team-tiles'>
        
        <div className='team-name'>
        <Image src={"/Rori.png"} width={300} height={300} alt='Rori'/>
        Rori Olaniyi
        </div>
    </div>

    
    <div className='team-tiles'>
    <Image src={"/Jinder.png"} width={300} height={300} alt='Jinder'/>
    Baljinder Hothi
    </div>
    </div>
  </div>
 </div>
);
}

 
 

 
 
