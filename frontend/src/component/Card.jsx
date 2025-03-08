import React from 'react'
import "./components.css"
export default function Card({ text, desc }) {
  return (
    <div className='card-container'>
        <img></img>
        <div className="card-info">

        
        <h2 className='card-title'>{text}</h2>
        <p className='card-desc'>{desc}</p>
        </div>
    </div>
  )
}
