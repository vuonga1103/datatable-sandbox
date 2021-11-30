import React, { useMemo } from 'react'
import Select from 'react-select'
import { getFormattedSelectOptions } from './filter-utils'

// This is a custom filter UI for selecting
// a unique option from a list

const SingleSelectColFilter = ({
  column: { setFilter, preFilteredRows, id },
}) => {
  // Calculate the options for filtering
  // using the preFilteredRows
  const formattedOptions = useMemo(
    () => getFormattedSelectOptions(id, preFilteredRows),
    [id, preFilteredRows]
  )

  const handleChange = selectedOption => {
    if (selectedOption) setFilter(selectedOption.value || '')
    else setFilter('')
  }

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      defaultValue={''}
      name="basic-single-select"
      options={formattedOptions}
      isClearable
      onChange={handleChange}
    />
  )
}

export default SingleSelectColFilter
