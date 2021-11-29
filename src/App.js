import './App.css'
import { mockData } from './mockData'

import DataTable from './components/DataTable'
import FirstNameHeader from './FirstNameHeader'
import SingleSelectColFilter from './components/SingleSelectFilter'
import DateRangeFilter, {
  dateRangeFilterFn,
} from './components/DateRangeFilter'

const COL_CONFIG = [
  {
    Header: FirstNameHeader,
    accessor: 'firstName',
    Filter: SingleSelectColFilter,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    Filter: SingleSelectColFilter,
  },
  {
    Header: 'Email',
    accessor: 'email',
    disableFilters: true,
  },
  {
    Header: 'Favorite Animal',
    accessor: 'favoriteAnimal',
  },
  {
    Header: 'Birthday',
    accessor: 'birthday',
    Filter: DateRangeFilter,
    filter: dateRangeFilterFn,
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
