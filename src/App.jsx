import { Clip } from './Clip'
import React from 'react'
import { useTheme } from '@material-ui/styles'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import { actionsContent } from './global-state'

export function App() {
  const { addTrack, addClipToTrack } = actionsContent
  const theme = useTheme()
  const dispatch = useDispatch()
  const classes = makeStyles(styles.bind(this, theme))()
  const tracks = useSelector((state) => state.content.tracks || [])
  return (
    <div className={classes.root}>
      {tracks.map((track) => {
        return (
          <div key={track.id} style={{ display: 'inline-block' }}>
            <List>
              <Button
                variant='contained'
                onClick={() => dispatch(addClipToTrack({ id: track.id }))}
              >
                Add Clip ToTrack
              </Button>
              {(track.data || []).map(({ id, src }) => (
                <ListItem key={id}>
                  <Clip src={src} parentId={track.id} id={id} />
                </ListItem>
              ))}
            </List>
          </div>
        )
      })}
      <Button onClick={() => dispatch(addTrack())}>Add Track</Button>
    </div>
  )
}

function styles(theme) {
  return {
    root: {
      width: '100%',
      height: '100%',
      zIndex: 1
    },
    appFrame: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      position: 'absolute',
      right: 0,
      left: 0,
      margin: 0
    },
    navIconHide: {},
    drawerHeader: {
      ...theme.mixins.toolbar
    },
    drawerPaper: {
      width: 250,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.contrastText
    },
    iconColor: {
      color: theme.palette.primary.contrastText
    },
    content: {
      backgroundColor: theme.palette.background.default,
      width: '100%',
      marginTop: theme.spacing(1)
    }
  }
}
