import { v4 as uuidv4 } from 'uuid'

export const content = {
  setContent(state, { payload: { content } }) {
    state.tracks = content.tracks
  },
  addTrack(state) {
    const track = {
      id: `track-${uuidv4()}`,
      data: [
        {
          id: `clip-${uuidv4()}`,
          src: './bd.wav',
          volume: 0.66,
          isLooping: true,
          isWaveformShown: true,
          isPlaying: false
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
          src: './bd.wav',
          volume: 0.66,
          isLooping: true,
          isWaveformShown: true,
          isPlaying: false
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
  },
  toggleIsPlaying(state, { payload: { tracksId, clipId, isPlaying } }) {
    const tracksIdx = state.tracks.findIndex((item) => item.id === tracksId)
    const clipIdx = state.tracks[tracksIdx].data.findIndex(
      (item) => item.id === clipId
    )
    state.tracks[tracksIdx].data[clipIdx].isPlaying = isPlaying
  },
  toggleIsLooping(state, { payload: { tracksId, clipId, isLooping } }) {
    const tracksIdx = state.tracks.findIndex((item) => item.id === tracksId)
    const clipIdx = state.tracks[tracksIdx].data.findIndex(
      (item) => item.id === clipId
    )
    state.tracks[tracksIdx].data[clipIdx].isLooping = isLooping
  },
  toggleIsWaveformShown(
    state,
    { payload: { tracksId, clipId, isWaveformShown } }
  ) {
    const tracksIdx = state.tracks.findIndex((item) => item.id === tracksId)
    const clipIdx = state.tracks[tracksIdx].data.findIndex(
      (item) => item.id === clipId
    )
    state.tracks[tracksIdx].data[clipIdx].isWaveformShown = isWaveformShown
  },
  toggleIsScenePlaying(state, { payload: { sceneIdx } }) {
    state.tracks.forEach((track, idx) => {
      state.tracks[idx].data.forEach((clip, idxx) => {
        state.tracks[idx].data[idxx].isPlaying = false
      })
      if (track.data[sceneIdx]) {
        state.tracks[idx].data[sceneIdx].isPlaying = true
      }
    })
  }
}
