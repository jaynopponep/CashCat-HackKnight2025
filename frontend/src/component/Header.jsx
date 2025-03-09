import React from 'react'
import Button from './Button'
import { Cat } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
  return (
    <div className='header-container'>
      <div className="header-logo-container">
        <h1>CashCat</h1>
        <Cat />
      </div>

      <div className="header-links-container">
        <ul>
          <li>
            <a className="transition hover:text-red-300/75" href="#">
              Tracking
            </a>
          </li>
          <li>
            <a className="transition hover:text-red-300/75" href="#">
              Budget
            </a>
          </li>
          <li>
            <a className="transition hover:text-red-300/75" href="#">
              About
            </a>
          </li>
          <li>
            <Link href="/Social" className="transition hover:text-red-300/75">
              Social
            </Link>
          </li>
        </ul>
      </div>
      <div className="header-login-container">
        <Link href="/Login">
          <Button text={"Login"} />
        </Link>
        <Link href="/SignUp">
          <button className='rounded-sm text-white transition hover:text-red-300/75'>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  )
}
