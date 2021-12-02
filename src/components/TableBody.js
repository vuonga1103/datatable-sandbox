import React from 'react'

const TableBody = ({
  getTableBodyProps,
  rows,
  prepareRow,
  rowSpecificStyleConfigs,
}) => {
  return (
    <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              const {
                getCellProps,
                render,
                column: { colTdStyle },
                row: { original },
              } = cell

              // check in rowSpecificStyleConfigs for possible row style to apply to cell, accumulate styles if there are multiple configs for the same cell
              const rowSpecificStyle = rowSpecificStyleConfigs.reduce(
                (acc, { fn, style }) => {
                  const shouldCellHaveStyle = Boolean(fn(original))
                  if (shouldCellHaveStyle) acc = { ...acc, ...style }
                  return acc
                },
                {}
              )

              return (
                <td
                  {...getCellProps()}
                  style={{ ...rowSpecificStyle, ...colTdStyle }}
                >
                  {render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}

export default TableBody
