import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

import { DEFAULT_GLOBAL_FILTER_CONFIG } from './DataTable'

const GlobalFilter = ({ filter, setFilter, config }) => {
  const [value, setValue] = useState(filter)

  const { label, placeholder, wrapperStyle } = config

  const setFilterOnDebounce = useAsyncDebounce(value => {
    setFilter(value || '')
  }, 500)

  const handleInputChange = e => {
    const { value } = e.target

    setValue(value)
    setFilterOnDebounce(value)
  }

  return (
    <div style={{ ...wrapperStyle }}>
      {label || DEFAULT_GLOBAL_FILTER_CONFIG.label}
      <input
        value={value || ''}
        onChange={handleInputChange}
        placeholder={placeholder || DEFAULT_GLOBAL_FILTER_CONFIG.placeholder}
      />
    </div>
  )
}

export default GlobalFilter
