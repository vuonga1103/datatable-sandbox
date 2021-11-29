export const getFormattedSelectOptions = (id, preFilteredRows) => {
  const options = new Set()
  preFilteredRows.forEach(row => {
    options.add(row.values[id])
  })

  const formattedOptions = [...options].map(option => ({
    value: option,
    label: option,
  }))

  return formattedOptions
}
