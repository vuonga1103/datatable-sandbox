import './App.css'
import DataTable from './components/DataTable'
import { mockData } from './mockData'
import { IconCell } from './components/Cells/cellTypes'

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
    Header: ({ value }) => 'First Name',
    headerStyle: { backgroundColor: 'yellow' },
    accessor: 'firstName',
    style: {
      color: 'blue',
      backgroundColor: 'yellow',
    },
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
  {
    Header: 'Email',
    accessor: 'email',
    cellValueFormatter: value => `#${value}`,
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
