import React from 'react'
import "./components.css"
function Transaction({ info }) {
  return (
    <div className='transaction-container'>
        {info}
    </div>
  )
}

export default Transaction