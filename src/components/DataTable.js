import React from 'react'
import styled from 'styled-components'
import { usePagination, useTable } from 'react-table'
import Pagination from './Pagination'

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

const DEFAULT_PAGINATION_CONFIG = {
  pageSize: 50,
  hasJumpToPage: false,
  hasRowsPerPage: false,
  align: 'right',
  wrapperStyle: {},
}

const DataTable = ({
  colConfig,
  data,
  isPaginated = false,
  paginationConfig = DEFAULT_PAGINATION_CONFIG,
}) => {
  const memoizedColumns = React.useMemo(() => colConfig, [colConfig])
  const memoizedData = React.useMemo(() => data, [data])

  const tableInstance = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      initialState: { pageIndex: 0, pageSize: paginationConfig.pageSize },
    },
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // rows for the active page
  } = tableInstance

  const renderRows = (row, i) => {
    prepareRow(row)
    return (
      <tr {...row.getRowProps()}>
        {row.cells.map(cell => {
          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
        })}
      </tr>
    )
  }

  return (
    <Styles>
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
          {isPaginated ? page.map(renderRows) : rows.map(renderRows)}
        </tbody>
      </table>

      <Pagination tableInstance={tableInstance} />
    </Styles>
  )
}

export default DataTable
