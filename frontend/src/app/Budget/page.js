import React from 'react'
import Header from '@/component/Header'

function Budget() {
    
  return (
    <div className='budget-container'>
        <Header></Header>
        <div className='budget-categories'>
            <div className='budget-insights'>
                <h2>Income Categories</h2>
            </div>
            <div className='budget-insights'>
                <h2>Expense Categories</h2>
            </div>
        </div>
        <div className='budget-insights'>
            <h2>Financial insights</h2>
        </div>
    </div>
  )
}

export default Budget