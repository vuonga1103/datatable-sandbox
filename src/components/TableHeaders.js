import React from 'react'

const TableHeaders = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => {
            const { getHeaderProps, render, canFilter, colThStyle } = column

            return (
              <th {...getHeaderProps()} style={colThStyle}>
                {render('Header')}
                <div>{canFilter ? render('Filter') : null}</div>
              </th>
            )
          })}
        </tr>
      ))}
    </thead>
  )
}

export default TableHeaders
