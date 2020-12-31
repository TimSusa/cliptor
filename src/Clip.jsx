import React, { useState } from 'react'
import useSound from 'use-sound'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { actionsContent } from './global-state'

export function Clip(props) {
  const dispatch = useDispatch()
  const { changeClipSrc, changeClipVolume, toggleIsLooping } = actionsContent
  const { src, tracksId, clipId } = props
  const tracks = useSelector((state) => state.content.tracks)
  const tracksIdx = tracks.findIndex((item) => item.id === tracksId)
  const clipIdx = tracks[tracksIdx].data.findIndex((item) => item.id === clipId)
  const { isLooping, volume } = tracks[tracksIdx].data[clipIdx]
  const [isLoopingLocal, setIsLoopingLocal] = useState(isLooping)
  const soundOpts = {
    loop: isLoopingLocal,
    // preload: true,
    volume: volume
    // html5: true,
    // interrupt: false
  }
  const [play, { stop, pause, isPlaying, sound }] = useSound(src, soundOpts)

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
              pause(soundOpts)
            } else {
              sound.fade(0, volume, 500)
              sound.loop = isLoopingLocal
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
      <ListItem>
        <Typography>Loop</Typography>
        <Checkbox
          checked={isLoopingLocal}
          onChange={() => {
            setIsLoopingLocal(!isLoopingLocal)
            sound && sound.loop && sound.loop(!isLoopingLocal)
            dispatch(
              toggleIsLooping({ tracksId, clipId, isLooping: !isLoopingLocal })
            )
          }}
        ></Checkbox>
      </ListItem>
    </List>
  )
}

Clip.propTypes = {
  src: PropTypes.string,
  clipId: PropTypes.string,
  tracksId: PropTypes.string,
  volume: PropTypes.number,
  isLooping: PropTypes.bool
}
