import React, { useState } from 'react'
import { isInDateRange } from './filter-utils'

export const dateRangeFilterFn = (rows, columnIds, filterValue) => {
  const colId = columnIds[0]
  const { start, end } = filterValue

  const filterRowFn = row => {
    return isInDateRange({ start, end, current: row.original[colId] })
  }

  return rows.filter(filterRowFn)
}

const DateRangeFilter = ({ column: { setFilter } }) => {
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  })

  const handleDateChange = (value, type) => {
    const newDateRange = { ...dateRange, [type]: value }

    setFilter(newDateRange)
    setDateRange(newDateRange)
  }

  return (
    <div>
      <input
        type="date"
        value={dateRange.start}
        onChange={e => handleDateChange(e.target.value, 'start')}
      />
      <br />
      to
      <br />
      <input
        type="date"
        value={dateRange.end}
        onChange={e => handleDateChange(e.target.value, 'end')}
      />
    </div>
  )
}

export default DateRangeFilter
