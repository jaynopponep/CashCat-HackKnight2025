import React from 'react'
import "./components.css"

function Transaction({ info }) {
  return (
      <div className='transaction-container'>
        <p>{info.description}</p>
        <p>-${info.amount}</p>
        
      </div>
  )
}

export default Transaction
