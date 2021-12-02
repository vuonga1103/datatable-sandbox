import React, { useMemo } from 'react'
import styled from 'styled-components'
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useBlockLayout,
} from 'react-table'
import { useSticky } from 'react-table-sticky'

import GlobalFilter from './Filters/GlobalFilter'
import MultiSelectFilter, {
  multiSelectFilterFn,
} from './Filters/MultiSelectFilter'

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `
const Styles = styled.div`
  padding: 1rem;

  .table {
    border: 1px solid #ddd;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        width: 5px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;

        &.isResizing {
          background: red;
        }
      }
    }

    &.sticky {
      overflow: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }

      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }

      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      [data-sticky-td] {
        position: sticky;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: -2px 0px 3px #ccc;
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
    useGlobalFilter,
    useBlockLayout,
    useSticky
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
    <>
      {hasGlobalFilter ? (
        <GlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
          config={globalFilterConfig}
        />
      ) : null}
      <Styles>
        <div
          {...getTableProps()}
          className="table sticky"
          style={{ width: 500, height: 400 }}
        >
          <div className="header">
            {headerGroups.map(headerGroup => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map(column => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render('Header')}

                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
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
        </div>
      </Styles>
    </>
  )
}
export default DataTable
