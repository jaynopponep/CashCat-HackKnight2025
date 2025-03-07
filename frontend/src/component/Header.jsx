import React from 'react'
import Button from './Button'

export default function Header() {
  return (
    <div className='header-container'>
        <div className="header-logo-container">
            {/* put logo here type shi*/}
            <h1>CashCat</h1>
        </div>

        <div className="header-links-container">
            <ul>
                <li><a className="transition hover:text-red-300/75" href="#">Tracking</a></li>
                <li><a className="transition hover:text-red-300/75" href="#">Budget</a></li>
                <li><a className="transition hover:text-red-300/75" href="#">About</a></li>
            </ul>
        </div>
        <div className="header-login-container">
            <Button text={"Login"} ></Button>
           
            <button className='rounded-sm text-white transition hover:text-red-300/75'> Sign Up </button>
        </div>
    </div>
    
  )
}
