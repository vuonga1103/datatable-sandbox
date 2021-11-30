import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTable, useGlobalFilter, useFilters } from 'react-table'
import GlobalFilter from './Filters/GlobalFilter'
import MultiSelectFilter, {
  multiSelectFilterFn,
} from './Filters/MultiSelectFilter'

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

export const DEFAULT_GLOBAL_FILTER_CONFIG = {
  label: 'Search all columns: ',
  placeholder: 'Search...',
  wrapperStyle: {},
}

const DataTable = ({
  colConfig,
  data,
  hasGlobalFilter = false,
  globalFilterConfig = DEFAULT_GLOBAL_FILTER_CONFIG,
}) => {
  const memoizedColumns = useMemo(() => colConfig, [colConfig])
  const memoizedData = useMemo(() => data, [data])
  const defaultColumn = useMemo(() => {
    return {
      Filter: MultiSelectFilter,
      filter: multiSelectFilterFn,
    }
  }, [])

  const tableInstance = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      defaultColumn,
    },
    useFilters,
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
        <GlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
          config={globalFilterConfig}
        />
      ) : null}
      <table {...getTableProps()}>
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
