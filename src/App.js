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

function App() {
  return <DataTable colConfig={COL_CONFIG} data={mockData} />
}

export default App
