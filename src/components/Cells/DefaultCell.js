import React from 'react'

const defaultCellValueFormatter = (value) => value

const DefaultCell = ({ cellValueFormatter = defaultCellValueFormatter, cellValue }) => {
  const formattedCellValue = cellValueFormatter(cellValue || '')

  return <>{formattedCellValue}</>
}

export default DefaultCell
