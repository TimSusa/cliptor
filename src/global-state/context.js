import { createContext } from 'react'
let AudioContext = window.AudioContext || window.webkitAudioContext
const audioContext = new AudioContext()
// const audioContext = new (window.AudioContext || window.webkitAudioContext)()
const context = createContext({ audioContext })

export default context
