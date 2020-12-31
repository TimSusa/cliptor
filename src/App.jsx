import { Clip } from './Clip'
import React from 'react'
import { useTheme } from '@material-ui/styles'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import { actionsContent } from './global-state'

//const COLUMNS_WIDTH = 100
export function App() {
  const { addTrack, addClipToTrack } = actionsContent
  const theme = useTheme()
  const dispatch = useDispatch()
  const classes = makeStyles(styles.bind(this, theme))()
  const tracks = useSelector((state) => state.content.tracks || [])
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Button variant='contained' onClick={() => dispatch(addTrack())}>
            Add Track
          </Button>
        </ListItem>
      </List>
      {tracks.map((track) => {
        return (
          <List
            key={track.id}
            style={{
              display: 'inline-block',
              border: '1px solid grey',
              borderRadius: '3%',
              minWidth: `calc(100vw / ${tracks.length}px`,
              minHeight: 'calc(100vh'
            }}
          >
            {(track.data || []).map(({ id, src }) => (
              <ListItem key={id}>
                <Clip src={src} tracksId={track.id} clipId={id} />
              </ListItem>
            ))}
            <ListItem>
              <Button
                variant='contained'
                onClick={() => dispatch(addClipToTrack({ id: track.id }))}
              >
                Add Clip
              </Button>
            </ListItem>
          </List>
        )
      })}
    </div>
  )
}

function styles(theme) {
  return {
    root: {
      width: '100%',
      height: '100%',
      zIndex: 1,
      display: 'flex'
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
