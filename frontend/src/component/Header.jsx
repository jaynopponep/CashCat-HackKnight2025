'use client';

import React, { useEffect, useState } from 'react';
import Button from './Button';
import { Cat } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <div className='header-container'>
      <Link href="/" className="header-logo-container cursor-pointer">
          <h1>CashCat</h1>
        <Cat />
      </Link>

        <div className="header-links-container">
          <ul>
            <li>
              <Link className="transition hover:text-red-300/75" href="/Tracking">
                Tracking
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-red-300/75" href="/Budget">
                Budget
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-red-300/75" href="/Team">
                Team
              </Link>
            </li>
            <li>
              <Link href="/Social" className="transition hover:text-red-300/75">
                Social
              </Link>
            </li>
          </ul>
        </div>

        <div className="header-login-container">
          {isLoggedIn ? (
              <button
                  onClick={handleSignOut}
                  className="rounded-sm text-white transition cursor-pointer hover:text-red-300/75"
              >
                Sign Out
              </button>
          ) : (
              <>
                <Link href="/Login">
                  <Button text="Login" />
                </Link>
                <Link href="/SignUp">
                  <button className="rounded-sm text-white transition cursor-pointer hover:text-red-300/75">
                    Sign Up
                  </button>
                </Link>
              </>
          )}
        </div>
      </div>
  );
}
