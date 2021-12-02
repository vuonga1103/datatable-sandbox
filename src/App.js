import './App.css'
import { mockData } from './mockData'

import DataTable from './components/DataTable'
import FirstNameHeader from './FirstNameHeader'
import DateRangeFilter, {
  dateRangeFilterFn,
} from './components/Filters/DateRangeFilter'
import MuiMultiSelectFilter from './components/Filters/MuiMultiSelectFilter'

const COL_CONFIG = [
  {
    Header: FirstNameHeader,
    accessor: 'firstName',
    sticky: 'left',
    Filter: MuiMultiSelectFilter,
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    Filter: MuiMultiSelectFilter,
  },
  {
    Header: 'Email',
    accessor: 'email',
    disableFilters: true,
  },
  {
    Header: 'Favorite Animal',
    accessor: 'favoriteAnimal',
    Filter: MuiMultiSelectFilter,
  },
  {
    Header: 'Birthday',
    accessor: 'birthday',
    Filter: DateRangeFilter,
    filter: dateRangeFilterFn,
    Cell: ({ value }) => String(new Date(value).toLocaleDateString('en-US')),
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
