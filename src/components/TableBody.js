import React from 'react'

const TableBody = ({ getTableBodyProps, rows, prepareRow }) => {
  return (
    <div {...getTableBodyProps()} className="body">
      {rows.map((row, i) => {
        prepareRow(row)
        return (
          <div {...row.getRowProps()} className="tr">
            {row.cells.map(cell => {
              return (
                <div {...cell.getCellProps()} className="td">
                  {cell.render('Cell')}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default TableBody
