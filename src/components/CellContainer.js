import React from 'react'

import DefaultCell from './Cells/DefaultCell'
import { cellTypes } from './Cells/cellTypes'

const CellContainer = props => {
  const { column, cell, row } = props
  const { cellConfig, rowSpecificStyleConfigs } = column

  // check in rowSpecificStyleConfigs for possible row style to apply to cell, accumulate styles if there are multiple configs for the same cell
  const rowSpecificStyle = rowSpecificStyleConfigs.reduce(
    (acc, { fn, style }) => {
      const shouldCellHaveStyle = Boolean(fn(row.original))
      if (shouldCellHaveStyle) acc = { ...acc, ...style }
      return acc
    },
    {}
  )

  let activeCellConfig = cellConfig

  let cellElement = (
    <DefaultCell
      cellValueFormatter={column.cellValueFormatter}
      cellValue={cell.value}
    />
  )

  if (activeCellConfig?.type) {
    const { type } = activeCellConfig

    const CellComponent = cellTypes[type]

    if (CellComponent) {
      cellElement = (
        <CellComponent cellConfig={activeCellConfig} cellValue={cell.value} />
      )
    }
  }

  return (
    <td
      {...cell.getCellProps()}
      style={{ ...rowSpecificStyle, ...column.style }}
    >
      {cellElement}
    </td>
  )
}

export default CellContainer
