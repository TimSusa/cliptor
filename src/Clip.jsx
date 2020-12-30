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
  const [play, { stop, pause, isPlaying }] = useSound(src)
  return (
    <React.Fragment>
      <Typography>{src.substr(src.length - 25)}</Typography>
      <Button
        style={{ marginLeft: 8, background: isPlaying ? 'green' : 'grey' }}
        draggable='false'
        onClick={() => {
          if (isPlaying) {
            pause()
          } else {
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
        <Button variant='outlined' onClick={stop}>
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
