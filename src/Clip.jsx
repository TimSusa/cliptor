import React from 'react'
import useSound from 'use-sound'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { PropTypes } from 'prop-types'
import { useDispatch } from 'react-redux'
import { actionsContent } from './global-state'

export function Clip(props) {
  const dispatch = useDispatch()
  const { changeClipSrc } = actionsContent
  const { src, tracksId, clipId } = props
  const [play, { stop, pause, isPlaying, sound }] = useSound(src, {
    interrupt: false
  })
  return (
    <React.Fragment>
      <Typography>{src.substr(src.length - 35)}</Typography>
      <Typography>
        {(sound && Array.isArray(sound._sounds) && sound._sounds[0]._seek) || 0}
      </Typography>
      <Button
        style={{ marginLeft: 8, background: isPlaying ? 'green' : 'grey' }}
        draggable='false'
        onClick={() => {
          if (isPlaying) {
            sound.fade(1, 0, 500)

            pause()
          } else {
            sound.fade(0, 1, 500)

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
      {isPlaying && (
        <Button
          variant='outlined'
          onClick={() => {
            sound.fade(1, 0, 500)
            stop()
          }}
        >
          Stop
        </Button>
      )}
    </React.Fragment>
  )
}

Clip.propTypes = {
  src: PropTypes.string,
  clipId: PropTypes.string,
  tracksId: PropTypes.string
}
