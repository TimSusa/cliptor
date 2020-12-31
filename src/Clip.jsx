import React from 'react'
import useSound from 'use-sound'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { PropTypes } from 'prop-types'
import { useDispatch } from 'react-redux'
import { actionsContent } from './global-state'

export function Clip(props) {
  const dispatch = useDispatch()
  const { changeClipSrc, changeClipVolume } = actionsContent
  const { src, tracksId, clipId, volume } = props
  const [play, { stop, pause, isPlaying, sound }] = useSound(src, {
    loop: true,
    preload: true,
    volume: 1,
    html5: true
  })
  return (
    <List style={{ border: '1px solid grey', borderRadius: '3%' }}>
      <ListItem>
        <Typography>File: </Typography>
        <Typography>{src.substr(src.length - 35)}</Typography>
      </ListItem>
      <ListItem>
        <Typography> LastPos: </Typography>
        <Typography>
          {sound &&
            Array.isArray(sound._sounds) &&
            parseInt(
              (parseFloat(sound._sounds[0]._seek, 10) * 1000) / 1000,
              10
            )}
        </Typography>
      </ListItem>
      <ListItem>
        <Button
          style={{ marginLeft: 8, background: isPlaying ? 'green' : 'grey' }}
          draggable='false'
          onClick={() => {
            if (isPlaying) {
              sound.fade(volume, 0, 500)
              pause()
            } else {
              sound.fade(0, volume, 500)
              play()
            }
          }}
          onDrop={(e) => {
            let dt = e.dataTransfer
            let files = dt.files
            e.preventDefault()
            dispatch(
              changeClipSrc({
                tracksId,
                clipId,
                src: files[0].path || files[0].name
              })
            )
          }}
          onDragOver={(e) => {
            e.preventDefault()
          }}
          onDragEnd={(e) => {
            e.preventDefault()
          }}
          variant='outlined'
        >
          {isPlaying ? 'Pause' : 'Play' || 'None'}
        </Button>
        {
          <Button
            variant='outlined'
            onClick={() => {
              sound.fade(volume, 0, 500)
              stop()
            }}
          >
            Stop
          </Button>
        }
      </ListItem>
      <ListItem>
        <input
          onChange={(e) => {
            const val = parseFloat(e.target.value / 100)
            sound.volume(val)
            dispatch(changeClipVolume({ clipId, tracksId, volume: val }))
          }}
          type='range'
          min='0'
          max='100'
          value={volume * 100}
          className='slider'
          id='myRange'
        />
      </ListItem>
    </List>
  )
}

Clip.propTypes = {
  src: PropTypes.string,
  clipId: PropTypes.string,
  tracksId: PropTypes.string,
  volume: PropTypes.number
}
