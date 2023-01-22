import React from 'react'

const OrderByBtn = ({label, onClick}) => {
  return (
    <button 
        type="button" 
        className="orderByBtn btn"
        onClick={() => onClick}>
            {label}
    </button>
  )
}

export default OrderByBtn