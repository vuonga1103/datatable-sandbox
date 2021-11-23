import './App.css'
import DataTable from './components/DataTable'
import { mockData } from './mockData'

const COL_CONFIG = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Favorite Animal',
        accessor: 'favoriteAnimal',
      },
    ],
  },
]

function App() {
  return <DataTable colConfig={COL_CONFIG} data={mockData} />
}

export default App
