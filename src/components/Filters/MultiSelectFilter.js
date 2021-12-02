import React, { useMemo } from 'react'
import Select from 'react-select'
import { getFormattedSelectOptions } from './filter-utils'

// Must use this custom filter fn with the UI
export const multiSelectFilterFn = (rows, columnIds, filterValues) => {
  const colId = columnIds[0]
  const filterRowFn = row => filterValues.includes(String(row.original[colId]))
  const hasSelectedValues = filterValues.length > 0

  return hasSelectedValues ? rows.filter(filterRowFn) : rows
}

const MultiSelectFilter = ({ column: { setFilter, preFilteredRows, id } }) => {
  // Calculate the options for filtering
  // using the preFilteredRows
  const formattedOptions = useMemo(
    () => getFormattedSelectOptions(id, preFilteredRows),
    [id, preFilteredRows]
  )

  const handleChange = selectedOptions => {
    const optionValues = selectedOptions.map(({ value }) => value)
    setFilter(optionValues)
  }

  return (
    <Select
      defaultValue={[]}
      isMulti
      name="basic-multi-select"
      options={formattedOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleChange}
      styles={{
        menu: provided => ({
          ...provided,
          zIndex: 3,
        }),
      }}
    />
  )
}

export default MultiSelectFilter
