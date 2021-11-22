import React from 'react'
import { Tooltip } from '@mui/material'

const FirstNameHeader = () => {
  return (
    <Tooltip title="This is a tooltip for First Name colum header">
      <div>
        <span style={{ color: 'blue' }}>Header for First Name</span>
        <br />
        <span style={{ fontSize: 12 }}>Subheader for First Name</span>
      </div>
    </Tooltip>
  )
}

export default FirstNameHeader
