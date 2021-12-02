import * as React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const getSelectedOptions = (id, preFilteredRows) => {
  const options = new Set()

  preFilteredRows.forEach(row => {
    options.add(row.values[id])
  })

  return [...options]
}

const MuiMultiSelectFilter = ({
  column: { setFilter, preFilteredRows, id },
}) => {
  const [selectedOptions, setSelectedOptions] = React.useState([])
  const options = React.useMemo(
    () => getSelectedOptions(id, preFilteredRows),
    [id, preFilteredRows]
  )

  const handleChange = event => {
    const {
      target: { value },
    } = event

    // On autofill we get a the stringified value.
    const parsedValue = typeof value === 'string' ? value.split(',') : value

    setFilter(parsedValue)
    setSelectedOptions(parsedValue)
  }

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-checkbox-label">Select</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {options.map(option => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedOptions.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default MuiMultiSelectFilter
