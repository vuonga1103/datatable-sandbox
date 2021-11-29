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

export const isInDateRange = ({ start, end, current }) => {
  const startDate = start ? new Date(start) : new Date(0)
  const endDate = end ? new Date(end) : new Date()
  const currentDate = new Date(current)

  return currentDate >= startDate && currentDate <= endDate
}
