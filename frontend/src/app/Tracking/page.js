"use client"
import Transaction from '@/component/Transaction'
import React, { useState } from 'react'
import "./transaction.css"
import Header from '@/component/Header'

export default function Tracking() {
    const[transaction, setTransaction] = useState(['Amazon', 'The children of Jay', 'Jinder\'s punani'])


  return (
    <div className='tracking'>
    <Header></Header>
    <div className='tracking-container'>
        <div className='tracking-transaction'>
            <h2>Transaction History</h2>
            <div>
              {transaction.map((purchase, key) => (
                <Transaction key={key} info={purchase} ></Transaction>
              ))}
            </div>
        </div>

        <div className='tracking-graphs'>
          <h2>Dashboard</h2>
          
        </div>
    </div>
    </div>
  )
}
