import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

import { mockData } from '../mockData'

import { IconCell } from './Cells/cellTypes'
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

function Table({ columns, data }) {
  const columnsWithCells = useMemo(() => {
    return columns.map((column) => {
      const columnWithCell = {
        ...column,
        Cell: CellContainer,
      }
      return columnWithCell
    })
  }, [])

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columnsWithCells,
      data,
    })

  // Render the UI for your table
  return (
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
  )
}

const COL_CONFIG = [
  {
    Header: 'Icon',
    accessor: 'icon',
    style: {
      width: 150,
      display: 'flex',
      justifyContent: 'center',
    },
    cellConfig: {
      type: IconCell,
    },
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
    style: {
      color: 'blue',
    },
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Email',
    accessor: 'email',
    cellValueFormatter: (value) => `#${value}`,
  },
  {
    Header: 'Favorite Animal',
    accessor: 'favoriteAnimal',
  },
]

const DataTable = () => {
  const columns = React.useMemo(() => COL_CONFIG, [])
  const data = React.useMemo(() => mockData, [])

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default DataTable
