import React from 'react'
import "./components.css"
export default function Button({ text, ref }) {
  return (
    <button className='buttons' href={ref}>{text}</button>
  )
}
