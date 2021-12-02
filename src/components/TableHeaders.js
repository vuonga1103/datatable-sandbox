import React from 'react'

const TableHeaders = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}>
              {column.render('Header')}

              <div>{column.canFilter ? column.render('Filter') : null}</div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}

export default TableHeaders
