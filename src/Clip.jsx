import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { PropTypes } from 'prop-types'

export function Clip(props) {
  const { src, id } = props
  return (
    <React.Fragment>
      <Typography>{id}</Typography>
      <Button variant='outlined'>{'Play' + src || 'None'}</Button>
    </React.Fragment>
  )
}

Clip.propTypes = {
  src: PropTypes.string,
  id: PropTypes.string
}
