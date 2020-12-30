import { v4 as uuidv4 } from 'uuid'

export const clip = {
  id: uuidv4(),
  src: './bd.wav'
}

export const track = {
  addClipToTrack(state) {
    state.track.push(clip)
  }
}
