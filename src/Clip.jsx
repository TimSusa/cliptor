import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
//import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import PlayIcon from '@material-ui/icons/PlayArrow'
import NoLoopIcon from '@material-ui/icons/ArrowRightAlt'
import LoopIcon from '@material-ui/icons/Loop'
import PauseIcon from '@material-ui/icons/Pause'
import MinimizeIcon from '@material-ui/icons/Minimize'
import MaximizeIcon from '@material-ui/icons/Maximize'
import FastForwardIcon from '@material-ui/icons/FastForward'
import FastRewindIcon from '@material-ui/icons/FastRewind'
import WaveSurfer from 'wavesurfer.js'
import Slider from '@material-ui/core/Slider'
//import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'
//import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js'

import { actionsContent, actionsViewSettings } from './global-state'

import { AudioDriverOutMenu } from './AudioDriverOutMenu'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    border: 'solid 1px grey',
    borderRadius: '5px',
    padding: 8
  }
}))
export function Clip({ url, tracksId, clipId }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { registerClip } = actionsViewSettings
  const {
    changeClipSrc,
    changeClipVolume,
    // toggleIsPlaying,
    toggleIsLooping,
    toggleIsWaveformShown
  } = actionsContent
  const audioDriverOuts = useSelector(
    (state) => state.viewSettings.audioDriverOuts
  )
  const tracks = useSelector((state) => state.content.tracks)
  const tracksIdx = tracks.findIndex((item) => item.id === tracksId)
  const clipIdx = tracks[tracksIdx].data.findIndex((item) => item.id === clipId)
  const {
    isPlaying,
    isLooping,
    isWaveformShown,
    volume,
    audioDriverOutName
  } = tracks[tracksIdx].data[clipIdx]
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const startTime = useRef(window.performance.now())
  const [playing, setPlay] = useState(isPlaying)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const options = formWaveSurferOptions(waveformRef.current)
    wavesurfer.current = WaveSurfer.create(options)
    wavesurfer.current.load(url)

    wavesurfer.current.on('loading', (progress) => {
      if (progress === 100) {
        setIsLoading(false)
      }
    })
    wavesurfer.current.on('ready', function () {
      // make sure object stillavailable when file loaded
      // if (wavesurfer.current) {
      //wavesurfer.current.setVolume(volume)
      // setIsLoading(false)
      //  }
    })
    wavesurfer.current.on('finish', () => {
      if (isLooping) {
        wavesurfer.current.playPause()
      }
    })
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy()
  }, [url])

  useEffect(() => {
    if (audioDriverOutName) {
      const sinkId = audioDriverOuts.find(
        (driver) => driver.label === audioDriverOutName
      ).deviceId
      wavesurfer.current.setSinkId(sinkId)
    }
  }, [audioDriverOutName])

  useEffect(() => {
    let playAlreadyStarted = false
    const ct = wavesurfer.current.backend.ac.currentTime
    const diff = (startTime.current - ct) / 1000

    if (isPlaying) {
      wavesurfer.current.play(playAlreadyStarted ? diff : 0)
      playAlreadyStarted = true
    } else {
      wavesurfer.current.stop(diff)
    }
  }, [isPlaying])

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
      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
        {url.substr(url.length - 35)}
      </div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <IconButton onClick={handlePlayPause} aria-label='play'>
          {isPlaying ? (
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
          aria-label='skip-backward'
          onClick={() => {
            wavesurfer.current.skip(-0.01)
            wavesurfer.current.play()
          }}
        >
          <FastRewindIcon style={{ width: 16 }}></FastRewindIcon>
        </IconButton>
        <IconButton
          aria-label='skip-forward'
          onClick={() => {
            wavesurfer.current.skip(0.01)
            wavesurfer.current.play()
          }}
        >
          <FastForwardIcon style={{ width: 16 }}></FastForwardIcon>
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
      <div>{isLoading ? 'IS LOADING...' : ''}</div>
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
      {audioDriverOuts.length > 0 && (
        <div style={{ width: '100%' }}>
          <AudioDriverOutMenu
            driverName={audioDriverOutName}
            tracksId={tracksId}
            clipId={clipId}
          ></AudioDriverOutMenu>
        </div>
      )}
    </div>
  )

  function handlePlayPause() {
    setPlay(!playing)
    //dispatch(toggleIsPlaying({ tracksId, clipId, isPlaying: !isPlaying }))
    if (isPlaying) {
      dispatch(registerClip({ clip: { tracksId, clipId, isPlaying: false } }))
    } else {
      dispatch(registerClip({ clip: { tracksId, clipId, isPlaying: true } }))
    }
    //wavesurfer.current.playPause()
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
    closeAudioContext: false,
    // splitChannels: true,
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
    //backend: 'WebAudio',
    plugins: [
      // Cursor.create({
      //   showTime: true,
      //   opacity: 1,
      //   customShowTimeStyle: {
      //     'background-color': '#000',
      //     color: '#fff',
      //     padding: '2px',
      //     'font-size': '10px'
      //   }
      // })
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
