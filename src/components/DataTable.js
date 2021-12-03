import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

import CellContainer from './CellContainer'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const DataTable = ({ colConfig, data, rowSpecificStyleConfigs = [] }) => {
  const memoizedColumns = useMemo(() => colConfig, [colConfig])
  const memoizedData = useMemo(() => data, [data])

  const columnsWithCells = useMemo(() => {
    return memoizedColumns.map(column => {
      const columnWithCell = {
        ...column,
        rowSpecificStyleConfigs,
        Cell: CellContainer,
      }
      return columnWithCell
    })
  }, [memoizedColumns, rowSpecificStyleConfigs])

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columnsWithCells,
      data: memoizedData,
    })

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} style={column.headerStyle}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowId) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, rowCellId) => {
                  const cellId = `${rowId}-${rowCellId}`
                  return (
                    <React.Fragment key={cellId}>
                      {cell.render('Cell')}
                    </React.Fragment>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Styles>
  )
}

export default DataTable
