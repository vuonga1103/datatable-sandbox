import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTable, useGlobalFilter, useFilters } from 'react-table'
import GlobalFilter from './Filters/GlobalFilter'
import MultiSelectFilter, {
  multiSelectFilterFn,
} from './Filters/MultiSelectFilter'
import TableHeaders from './TableHeaders'
import TableBody from './TableBody'

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
        <TableHeaders headerGroups={headerGroups} />
        <TableBody
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
        />
      </table>
    </Styles>
  )
}
export default DataTable
