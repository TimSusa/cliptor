import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { actionsContent } from '../global-state'
const { setAudioDriverOutName } = actionsContent
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '95%'
  },
  selectEmpty: {
    marginTop: theme.spacing(1)
  }
}))

export function AudioDriverOutMenu(props) {
  const { driverName, tracksId, clipId } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const audioDriverOuts = useSelector(
    (state) => state.viewSettings.audioDriverOuts
  )

  function handleChange(e) {
    dispatch(
      setAudioDriverOutName({
        tracksId,
        clipId,
        audioDriverOutName: e.target.value
      })
    )
  }
  const defaultDriver = audioDriverOuts.find(
    (driver) => driver.deviceId === 'default' || driver.deviceId === ''
  ).label
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id='audio-driver-out-label'>Audio Driver Out</InputLabel>
      <Select
        labelId='audio-driver-out-label'
        id='audio-driver-out'
        value={driverName ? driverName : defaultDriver}
        onChange={handleChange}
      >
        {(audioDriverOuts || []).map((driver, idx) => {
          return (
            <MenuItem
              key={`audio-driver-out-${idx}`}
              value={driver.label || 'none'}
            >
              {driver.label}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}

AudioDriverOutMenu.propTypes = {
  clipId: PropTypes.any,
  driverName: PropTypes.string,
  tracksId: PropTypes.any
}
