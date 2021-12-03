import React from 'react'

const TableHeaders = ({ headerGroups }) => {
  return (
    <div className="header">
      {headerGroups.map(headerGroup => (
        <div {...headerGroup.getHeaderGroupProps()} className="tr">
          {headerGroup.headers.map(column => (
            <div {...column.getHeaderProps()} className="th">
              {column.render('Header')}
              <div>{column.canFilter ? column.render('Filter') : null}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default TableHeaders
