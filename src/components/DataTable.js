import React from 'react'
import styled from 'styled-components'
import { useTable, useGlobalFilter } from 'react-table'
import GlobalFilter from './GlobalFilter'

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

const DataTable = ({ colConfig, data, hasGlobalFilter }) => {
  const memoizedColumns = React.useMemo(() => colConfig, [colConfig])
  const memoizedData = React.useMemo(() => data, [data])

  const tableInstance = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
    },
    useGlobalFilter
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance

  const { globalFilter } = state

  return (
    <Styles>
      {hasGlobalFilter ? (
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      ) : null}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
