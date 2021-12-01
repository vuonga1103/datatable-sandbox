import React from 'react'
import './App.css'
import DataTable from './components/DataTable'
import FirstNameHeader from './FirstNameHeader'
import { mockData } from './mockData'

// Helper function to use with sort function, returns appropriate sort value if the current row should be on top
const getSortValueForStaticRow = (numStaticRow = 1, currentRowIdx, desc) => {
  const shouldRowBeStatic = currentRowIdx < numStaticRow

  if (shouldRowBeStatic && !desc) return 1
  if (shouldRowBeStatic && desc) return -1

  return null
}

const stringSortWithStaticTwoRows = (rowA, rowB, columnId, desc) => {
  const NUM_STATIC_ROWS = 2

  // First check to see if current row (rowB) being compared should be static
  // if it is then return the sort value that will keep it at the start of the table
  const sortValueForStaticRow = getSortValueForStaticRow(
    NUM_STATIC_ROWS,
    rowB.index,
    desc
  )
  if (sortValueForStaticRow) return sortValueForStaticRow
  return rowA.original[columnId] > rowB.original[columnId] ? 1 : -1
}

// const sortByStringLength = (rowA, rowB, columnId, desc) => {
//   return rowA.original[columnId].length > rowB.original[columnId].length
//     ? 1
//     : -1
// }

function App() {
  const colConfig = [
    {
      Header: FirstNameHeader,
      accessor: 'firstName',
      disableSortBy: true,
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      sortType: React.useMemo(() => stringSortWithStaticTwoRows, []),
    },
    {
      Header: 'Email',
      accessor: 'email',
      sortType: React.useMemo(() => stringSortWithStaticTwoRows, []),
    },
    {
      Header: 'Favorite Animal',
      accessor: 'favoriteAnimal',
      sortType: React.useMemo(() => stringSortWithStaticTwoRows, []),
    },
  ]

  return <DataTable colConfig={colConfig} data={mockData} />
}

export default App
