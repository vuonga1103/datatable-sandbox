import React from 'react'

const IconCell = ({ cellValue }) => {
  return (
    <img
      style={{ width: 20, height: 'auto' }}
      src={cellValue}
      alt={`#{icon}`}
    />
  )
}

export default IconCell
