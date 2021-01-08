import { createContext } from 'react'

const audioContext = new AudioContext()
const context = createContext({ audioContext })

export default context
