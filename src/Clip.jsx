import React from 'react'
import useSound from 'use-sound'
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
    <React.Fragment>
      <Typography>{src.substr(src.length - 35)}</Typography>
      <Typography> Pos/Sec: </Typography>
      <Typography>
        {sound &&
          Array.isArray(sound._sounds) &&
          parseInt((parseFloat(sound._sounds[0]._seek, 10) * 1000) / 1000, 10)}
      </Typography>
      <input
        onChange={(e) => {
          const val = parseFloat(e.target.value / 100)
          console.log('set volueme ', val, sound._volume)
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
    </React.Fragment>
  )
}

Clip.propTypes = {
  src: PropTypes.string,
  clipId: PropTypes.string,
  tracksId: PropTypes.string,
  volume: PropTypes.number
}
