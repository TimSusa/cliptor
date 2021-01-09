import React, { useState } from 'react'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import VersionIcon from '@material-ui/icons/FormatListNumberedRtl'

import { ListItemLoadFileOnWeb } from './ListItemLoadFileOnWeb'
import { PropTypes } from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { actionsContent } from '../global-state'
const version = process.env.REACT_APP_VERSION || 'dev'

export const DrawerList = DrawerListCmp

function DrawerListCmp(props) {
  const dispatch = useDispatch()
  const { setContent } = actionsContent
  const contentAll = useSelector((state) => state)
  // const viewSettings = useSelector((state) => state.viewSettings)
  // const sliders = useSelector((state) => state.sliders)
  const { classes, onFileChange } = props

  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <div className={classes.drawerHeader} />
      <Divider />
      <List>
        <ListItemLoadFileOnWeb
          onFileChange={handleFileChange}
          iconColor={classes.iconColor}
        />
      </List>
      <List>
        <ListItem button onClick={exportToFile}>
          <ListItemIcon className={classes.iconColor}>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText>Save Preset</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            dispatch(setContent({ content: { tracks: [] } }))
            setOpen(!open)
          }}
        >
          <ListItemIcon className={classes.iconColor}>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText>Delete All</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon className={classes.iconColor}>
            <VersionIcon />
          </ListItemIcon>
          <ListItemText>{`${version}`}</ListItemText>
        </ListItem>
      </List>
      <Divider />
    </React.Fragment>
  )
  function exportToFile() {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(contentAll, null, 2)], {
        type: 'text/plain'
      })
    )
    a.setAttribute('download', 'cliptor-preset.json')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
  async function handleFileChange(content) {
    //await dispatch(thunkLoadFile(content.content, content.presetName))
    dispatch(setContent({ content: content.content.content }))
    onFileChange(content.content, content.presetName)
  }
}

DrawerListCmp.propTypes = {
  classes: PropTypes.shape({
    drawerHeader: PropTypes.any,
    iconColor: PropTypes.any
  }),
  handleResetSliders: PropTypes.any,
  onClose: PropTypes.func,
  onFileChange: PropTypes.any
}
