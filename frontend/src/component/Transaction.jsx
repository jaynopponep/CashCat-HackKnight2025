import React from 'react'
import "./components.css"

function Transaction({ info }) {
  return (
      <div className='transaction-container'>
        <p>Amount: ${info.amount}</p>
        <p>Description: {info.description}</p>
      </div>
  )
}

export default Transaction
