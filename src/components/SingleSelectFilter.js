import React from 'react'
import Select from 'react-select'

// This is a custom filter UI for selecting
// a unique option from a list

function SingleSelectColFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  const formattedOptions = options.map(option => ({
    value: option,
    label: option,
  }))

  const handleChange = selectedOption => {
    if (selectedOption) setFilter(selectedOption.value || '')
    else setFilter('')
  }

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={filterValue}
      name="color"
      options={formattedOptions}
      isClearable
      onChange={handleChange}
    />
  )
}

export default SingleSelectColFilter
