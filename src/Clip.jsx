import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import PlayIcon from '@material-ui/icons/PlayArrow'
import NoLoopIcon from '@material-ui/icons/ArrowRightAlt'
import LoopIcon from '@material-ui/icons/Loop'
import PauseIcon from '@material-ui/icons/Pause'
import MinimizeIcon from '@material-ui/icons/Minimize'
import MaximizeIcon from '@material-ui/icons/Maximize'
import WaveSurfer from 'wavesurfer.js'
import Slider from '@material-ui/core/Slider'
//import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'
import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js'

import { actionsContent } from './global-state'
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column'
  }
}))
export function Clip({ url, tracksId, clipId }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    changeClipSrc,
    changeClipVolume,
    toggleIsLooping,
    toggleIsWaveformShown
  } = actionsContent
  const tracks = useSelector((state) => state.content.tracks)
  const tracksIdx = tracks.findIndex((item) => item.id === tracksId)
  const clipIdx = tracks[tracksIdx].data.findIndex((item) => item.id === clipId)
  const { isLooping, isWaveformShown, volume } = tracks[tracksIdx].data[clipIdx]
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const [playing, setPlay] = useState(false)
  //const [volume, setVolume] = useState(volTmp)

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(false)

    const options = formWaveSurferOptions(waveformRef.current)
    wavesurfer.current = WaveSurfer.create(options)

    wavesurfer.current.load(url)

    wavesurfer.current.on('ready', function () {
      // https://wavesurfer-js.org/docs/methods.html
      // wavesurfer.current.play();
      // setPlay(true);

      // make sure object stillavailable when file loaded
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume)
        //setVolume(volume)
      }
    })
    wavesurfer.current.on('finish', () => {
      if (isLooping) {
        wavesurfer.current.playPause()
      }
    })

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy()
  }, [url, isLooping])

  return (
    <div
      className={classes.root}
      draggable='false'
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
    >
      <Typography style={{ whiteSpae: 'nowrap', overflow: 'hidden' }}>
        {url.substr(url.length - 35)}
      </Typography>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <IconButton onClick={handlePlayPause} aria-label='play'>
          {playing ? (
            <PauseIcon style={{ width: 16 }}></PauseIcon>
          ) : (
            <PlayIcon style={{ width: 16 }} />
          )}
        </IconButton>
        <IconButton
          onClick={() => {
            dispatch(
              toggleIsLooping({ tracksId, clipId, isLooping: !isLooping })
            )
          }}
          aria-label='loop'
        >
          {isLooping ? (
            <LoopIcon style={{ width: 16 }}></LoopIcon>
          ) : (
            <NoLoopIcon style={{ width: 16 }} />
          )}
        </IconButton>
        <IconButton
          aria-label='show waveform'
          onClick={() => {
            dispatch(
              toggleIsWaveformShown({
                tracksId,
                clipId,
                isWaveformShown: !isWaveformShown
              })
            )
          }}
        >
          {isWaveformShown ? (
            <MinimizeIcon style={{ width: 16 }} />
          ) : (
            <MaximizeIcon style={{ width: 16 }} />
          )}
        </IconButton>
      </div>

      <div
        style={{
          width: '100%',
          display: isWaveformShown ? 'unset' : 'none'
        }}
        id='waveform'
        ref={waveformRef}
      />

      <div style={{ width: '100%' }}>
        <Slider
          onChange={onVolumeChange}
          value={volume}
          name='volume'
          min={0.01}
          max={1}
          step={0.025}
          valueLabelDisplay='off'
          aria-labelledby='range-slider'
        />
      </div>
    </div>
  )

  function handlePlayPause() {
    setPlay(!playing)
    wavesurfer.current.playPause()
  }

  function onVolumeChange(e, value) {
    const newVolume = +value

    if (newVolume) {
      dispatch(changeClipVolume({ clipId, tracksId, volume: newVolume }))
      //setVolume(newVolume)
      wavesurfer.current.setVolume(newVolume || 1)
    }
  }
}

Clip.propTypes = {
  clipId: PropTypes.any,
  tracksId: PropTypes.any,
  url: PropTypes.any
}

function formWaveSurferOptions(ref) {
  return {
    container: ref,
    //waveColor: '#eee',
    // progressColor: 'OrangeRed',
    // cursorColor: 'OrangeRed',
    barWidth: 2,
    barRadius: 2,
    responsive: true,
    height: 80,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true,
    //backend: 'MediaElement',
    plugins: [
      Cursor.create({
        showTime: true,
        opacity: 1,
        customShowTimeStyle: {
          'background-color': '#000',
          color: '#fff',
          padding: '2px',
          'font-size': '10px'
        }
      })
      // Regions.create({
      //   regionsMinLength: 1,

      // loop: true,
      //   // regions: [
      //   //   {
      //   //     start: 1,
      //   //     end: 2,
      //   //     loop: false,
      //   //     color: 'hsla(400, 100%, 30%, 0.5)'
      //   //   },
      //   //   {
      //   //     start: 3,
      //   //     end: 4,
      //   //     loop: false,
      //   //     color: 'hsla(200, 50%, 70%, 0.4)',
      //   //     minLength: 1
      //   //   }
      //   // ],
      //   dragSelection: {
      //     slop: 2
      //   }
      // })
    ]
  }
}
