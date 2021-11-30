import React from 'react'

import DefaultCell from './Cells/DefaultCell'
import { cellTypes } from './Cells/cellTypes'

const CellContainer = (props) => {
  const {
    column,
    cell,
  } = props
  const { cellConfig } = column

  let activeCellConfig = cellConfig

  let cellElement = <DefaultCell cellValueFormatter={column.cellValueFormatter} cellValue={cell.value} />

  if (activeCellConfig?.type) {
    const { type } = activeCellConfig

    const CellComponent = cellTypes[type]

    if (CellComponent) {
      cellElement = (
        <CellComponent
          cellConfig={activeCellConfig}
          cellValue={cell.value}
        />
      )
    }
  }

  return (
    <td
      {...cell.getCellProps()}
      style={column.style}
    >
      {cellElement}
    </td>
  )
}

export default CellContainer
