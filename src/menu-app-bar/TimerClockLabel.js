import React, { useContext, useState } from 'react'
import { useRaf } from '../utils/useRaf'
import context from '../global-state/context'

export function TimerClockLabel() {
  const { audioContext } = useContext(context)
  const [time, setTime] = useState('')
  useRaf(() => setTime(audioContext.currentTime))
  return <div style={{ lineHeight: 3.5 }}>{msToTime(time * 1000)}</div>
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return hours + ':' + minutes + ':' + seconds + '.' + milliseconds
}
