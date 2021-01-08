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
// import MinimizeIcon from '@material-ui/icons/Minimize'
// import MaximizeIcon from '@material-ui/icons/Maximize'
import FastForwardIcon from '@material-ui/icons/FastForward'
import FastRewindIcon from '@material-ui/icons/FastRewind'
import SaveIcon from '@material-ui/icons/Save'
import WaveSurfer from 'wavesurfer.js'
import Slider from '@material-ui/core/Slider'
import { ButtonLoadAudioFile } from './ButtonLoadAudioFile'
//import Regions from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js'
//import Cursor from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js'

import { actionsContent, actionsViewSettings } from '../global-state'

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
    toggleIsLooping
    //toggleIsWaveformShown
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
  const startWasCalled = useRef(null)
  const arrayBuffer = useRef(null)

  const audioCtx = useRef(new AudioContext())
  const source = useRef(audioCtx.current.createBufferSource())
  // const startTime = useRef(window.performance.now())
  const [playing, setPlay] = useState(isPlaying)

  useEffect(() => {
    //setPlay(false)
    //dispatch(toggleIsPlaying({ tracksId, clipId, isPlaying: false }))
    //audioCtx.current = new AudioContext()
    //Now that the request has been defined, actually make the request. (send it)
    //const options = formWaveSurferOptions(waveformRef.current)
    // wavesurfer.current = WaveSurfer.create(options)
    //wavesurfer.current.cancelAjax()
    //wavesurfer.current.load(url)

    //wavesurfer.current.load(url)

    // wavesurfer.current.on('ready', function () {
    //   // make sure object stillavailable when file loaded
    //   // if (wavesurfer.current) {
    //   //wavesurfer.current.setVolume(volume)
    //   // setIsLoading(false)
    //   //  }
    // })
    // wavesurfer.current.on('finish', () => {
    //   if (isLooping) {
    //     // wavesurfer.current.playPause()
    //     //buffer.current.start()
    //   }
    // })

    cbd()

    async function cbd() {
      source.current = await getBufferByUrl(url)
      //wavesurfer.current.loadDecodedBuffer(source.current.buffer)
      console.log(source.current)
      //source.current.start(0)
    }

    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    // return () => wavesurfer.current.destroy()
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
    if (isPlaying) {
      console.log('play!!')
      source.current.start(0)
      startWasCalled.current = true
      //dispatch(toggleIsPlaying({ tracksId, clipId, isPlaying: true }))
      //wavesurfer.current.play(0.001)
      //audioCtx.current && audioCtx.current.resume()
    }
    if (!isPlaying && startWasCalled.current) {
      source.current.stop(0)
      console.log('stop!!!')
      //audioCtx.current && audioCtx.current.resume()
      //dispatch(toggleIsPlaying({ tracksId, clipId, isPlaying: false }))
    }
    //wavesurfer.current.stop(0.001)
    // source.current.stop(0)
    //startWasCalled = false
    // let playAlreadyStarted = false
    // const ct = wavesurfer.current.backend.ac.currentTime
    // const diff = (startTime.current - ct) / 1000 + 0.1

    // if (isPlaying) {
    //   wavesurfer.current.play()
    // } else {
    //   wavesurfer.current.stop()
    // }
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
        <ButtonLoadAudioFile
          onFileChange={({ content, presetName }) => {
            if (process.env.REACT_APP_IS_WEB_MODE === 'false') {
              dispatch(
                changeClipSrc({
                  tracksId,
                  clipId,
                  src: presetName
                })
              )
            } else {
              // sort out to load the encoded data into the store and rerender the component
              var blob = new window.Blob([new Uint8Array(content)])
              wavesurfer.current.stop()
              wavesurfer.current.destroy()
              const options = formWaveSurferOptions(waveformRef.current)
              wavesurfer.current = WaveSurfer.create(options)
              // Load the blob into Wavesurfer
              wavesurfer.current.loadBlob(blob)
              wavesurfer.current.on('finish', () => {
                if (isLooping) {
                  wavesurfer.current.playPause()
                }
              })
            }
          }}
        >
          <IconButton aria-label='load-file'>
            <SaveIcon style={{ width: 16 }}></SaveIcon>
          </IconButton>
        </ButtonLoadAudioFile>
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
  async function getBufferByUrl(url) {
    //...and the source

    //var source = audioCtx.current.createBufferSource()
    //connect it to the destination so you can hear it.
    source.current.connect(audioCtx.current.destination)
    const resp = await fetch(url)
    const arrayBuffer = await resp.arrayBuffer()
    arrayBuffer.current = arrayBuffer
    const audioBuffer = await audioCtx.current.decodeAudioData(arrayBuffer)
    source.current.buffer = audioBuffer
    source.current.loop = isLooping
    var merger = audioCtx.current.createChannelMerger(32)

    merger.connect(audioCtx.current.destination)
    source.current.connect(merger, 0, 1)
    source.current.connect(merger, 0, 0)
    //source.current.start(0)
    return source.current
    //source.buffer
  }
  function handlePlayPause() {
    setPlay(!playing)
    //dispatch(toggleIsPlaying({ tracksId, clipId, isPlaying: !isPlaying }))
    //wavesurfer.current.playPause()
    //source.current.buffer.start()
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
      //wavesurfer.current.setVolume(newVolume || 1)
    }
  }
}

Clip.propTypes = {
  blob: PropTypes.any,
  clipId: PropTypes.any,
  tracksId: PropTypes.any,
  url: PropTypes.string
}

function formWaveSurferOptions(ref) {
  // const processor = audioaudioCtx.current.createScriptProcessor(1024, 1, 1)

  // audioaudioCtx.current,
  // audioScriptProcessor: processor,
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
