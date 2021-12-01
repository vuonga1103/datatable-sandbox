import React from 'react'
import './App.css'
import DataTable from './components/DataTable'
import FirstNameHeader from './FirstNameHeader'
import { mockData } from './mockData'

function App() {
  const sortByLastNameLength = (rowA, rowB, columnId, desc) => {
    return rowA.original[columnId].length > rowB.original[columnId].length
      ? 1
      : -1
  }

  const colConfig = [
    {
      Header: FirstNameHeader,
      accessor: 'firstName',
      disableSortBy: true,
    },
    {
      Header: 'Last Name',
      accessor: 'lastName',
      sortType: React.useMemo(() => sortByLastNameLength, []),
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Favorite Animal',
      accessor: 'favoriteAnimal',
    },
  ]

  return <DataTable colConfig={colConfig} data={mockData} />
}

export default App
