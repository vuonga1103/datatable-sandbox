import './App.css'
import { mockData } from './mockData'

import DataTable from './components/DataTable'
import FirstNameHeader from './FirstNameHeader'
import SingleSelectColFilter from './components/SingleSelectFilter'
import MultiSelectFilter, {
  multiSelectFilterFn,
} from './components/MultiSelectFilter'

const COL_CONFIG = [
  {
    Header: FirstNameHeader,
    accessor: 'firstName',
    Filter: SingleSelectColFilter,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    Filter: MultiSelectFilter,
    filter: multiSelectFilterFn,
    // disableFilters: true,
  },
  {
    Header: 'Email',
    accessor: 'email',
    Filter: SingleSelectColFilter,
  },
  {
    Header: 'Favorite Animal',
    accessor: 'favoriteAnimal',
    Filter: SingleSelectColFilter,
  },
]

function App() {
  return (
    <DataTable
      colConfig={COL_CONFIG}
      data={mockData}
      hasGlobalFilter
      globalFilterConfig={{
        label: 'Search: ',
        placeholder: 'Find anything...',
        wrapperStyle: {
          padding: 4,
          marginBottom: 4,
        },
      }}
    />
  )
}

export default App
