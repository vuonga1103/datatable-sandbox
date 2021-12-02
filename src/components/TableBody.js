import React from 'react'

const TableBody = ({ getTableBodyProps, rows, prepareRow }) => {
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
              } = cell
              return (
                <td {...getCellProps()} style={colTdStyle}>
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
