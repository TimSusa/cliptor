import { Clip } from '../clip/Clip'
import React, { useEffect } from 'react'
import { useTheme } from '@material-ui/styles'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import AddTrackIcon from '@material-ui/icons/PlaylistAdd'
import PlaySceneIcon from '@material-ui/icons/PlayCircleOutline'
import StopSceneIcon from '@material-ui/icons/Stop'
import AddClipIcon from '@material-ui/icons/Add'

import { content } from '../utils/example_120bpm'
import { initDrivers } from '../global-state/thunks/drivers'
import { actionsContent, actionsViewSettings } from '../global-state'

export function Matrix() {
  const { setContent, addTrack, addClipToTrack } = actionsContent
  const { registerClips, clearRegisteredClips } = actionsViewSettings
  const theme = useTheme()
  const dispatch = useDispatch()
  const classes = makeStyles(styles.bind(this, theme))()
  const tracks = useSelector((state) => state.content.tracks || [])
  useEffect(() => {
    dispatch(initDrivers())
  }, [])
  useEffect(() => {
    dispatch(setContent({ content: content.content }))
  }, [setContent, dispatch])

  return (
    <div className={classes.root}>
      <List>
        {tracks.length > 0 &&
          tracks[0].data.map((clip, clipIdx) => {
            return (
              <ListItem
                style={{
                  height: 219
                }}
                key={`scene-${clipIdx}`}
              >
                {tracks.every((track) => track.data[clipIdx].isPlaying) ? (
                  <IconButton
                    aria-label='stop-scene'
                    onClick={() => {
                      dispatch(clearRegisteredClips())
                      // dispatch(stopIsScenePlaying({ sceneIdx: clipIdx }))
                    }}
                  >
                    <StopSceneIcon></StopSceneIcon>
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label='play-scene'
                    onClick={() => {
                      console.log('play scene: ', clipIdx)
                      const clips = tracks.map((track) => {
                        return {
                          tracksId: track.id,
                          clipId: track.data[clipIdx].id,
                          isPlaying: true
                        }
                      })
                      console.log('register clips from ', clips)
                      dispatch(registerClips({ clips }))
                      // TODO: convert to register clips
                      // dispatch(changeCurrentScene({ currentSceneIdx: clipIdx }))
                      //registerClips
                    }}
                  >
                    <PlaySceneIcon></PlaySceneIcon>
                  </IconButton>
                )}
              </ListItem>
            )
          })}
        <ListItem>
          <IconButton variant='contained' onClick={() => dispatch(addTrack())}>
            <AddTrackIcon></AddTrackIcon>
          </IconButton>
        </ListItem>
      </List>

      {tracks.map((track) => {
        return (
          <List
            key={track.id}
            style={{
              width: `calc(100vw / ${tracks.length + 1}`,
              minHeight: 'calc(100vh'
            }}
          >
            {(track.data || []).map(({ id, src, blob }) => (
              <ListItem key={id}>
                <Clip url={src} blob={blob} tracksId={track.id} clipId={id} />
              </ListItem>
            ))}
            <ListItem>
              <IconButton
                variant='contained'
                onClick={() => dispatch(addClipToTrack({ id: track.id }))}
              >
                <AddClipIcon></AddClipIcon>
              </IconButton>
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
