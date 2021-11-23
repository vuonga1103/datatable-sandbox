import './App.css'
import DataTable from './components/DataTable'
import FirstNameHeader from './FirstNameHeader'
import { mockData } from './mockData'

const COL_CONFIG = [
  {
    Header: FirstNameHeader,
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
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

const PAGINATION_CONFIG = {
  pageSize: 20,
  hasJumpToPage: true,
  hasRowsPerPage: true,
  wrapperStyle: {},
}

function App() {
  return (
    <DataTable
      colConfig={COL_CONFIG}
      data={mockData}
      isPaginated
      paginationConfig={PAGINATION_CONFIG}
    />
  )
}

export default App
