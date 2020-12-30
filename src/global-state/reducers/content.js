import { v4 as uuidv4 } from 'uuid'

export const content = {
  addTrack(state) {
    const track = {
      id: `track-${uuidv4()}`,
      data: [
        {
          id: `clip-${uuidv4()}`,
          src: './demo.mp3',
          volume: 1
        }
      ]
    }
    state.tracks.push(track)
  },
  addClipToTrack(state, { payload: { id } }) {
    const idx = state.tracks.findIndex((item) => item.id === id)
    state.tracks[idx] = {
      id,
      data: [
        ...state.tracks[idx].data,
        {
          id: `clip-${uuidv4()}`,
          src: './demo.mp3',
          volume: 1
        }
      ]
    }
  },
  changeClipSrc(state, { payload: { tracksId, clipId, src } }) {
    const tracksIdx = state.tracks.findIndex((item) => item.id === tracksId)
    const clipIdx = state.tracks[tracksIdx].data.findIndex(
      (item) => item.id === clipId
    )
    state.tracks[tracksIdx].data[clipIdx].src = src
  },
  changeClipVolume(state, { payload: { tracksId, clipId, volume } }) {
    const tracksIdx = state.tracks.findIndex((item) => item.id === tracksId)
    const clipIdx = state.tracks[tracksIdx].data.findIndex(
      (item) => item.id === clipId
    )
    state.tracks[tracksIdx].data[clipIdx].volume = volume
  }
}
