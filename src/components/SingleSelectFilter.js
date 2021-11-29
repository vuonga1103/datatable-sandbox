import React, { useMemo } from 'react'
import Select from 'react-select'
import { getFormattedSelectOptions } from './filter-utils'

// This is a custom filter UI for selecting
// a unique option from a list

const SingleSelectColFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  // Calculate the options for filtering
  // using the preFilteredRows
  //   const options = useMemo(() => {
  //     const options = new Set()
  //     preFilteredRows.forEach(row => {
  //       options.add(row.values[id])
  //     })

  //     const formattedOptions = [...options].map(option => ({
  //       value: option,
  //       label: option,
  //     }))

  //     return formattedOptions
  //   }, [id, preFilteredRows])

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
      defaultValue={filterValue}
      name="color"
      options={formattedOptions}
      isClearable
      onChange={handleChange}
    />
  )
}

export default SingleSelectColFilter
