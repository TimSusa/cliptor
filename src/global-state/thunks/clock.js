import { actionsContent, actionsViewSettings } from '../'

const {
  toggleIsScenePlaying,
  // toggleIsPlaying,
  toggleIsPlayingList
} = actionsContent
const { changeCurrentScene, clearRegisteredClips } = actionsViewSettings

export function initClock() {
  let timer = null
  return function (dispatch, getState) {
    const {
      viewSettings: { bpm, windowFrameInSteps }
    } = getState()

    console.log('initClock with BPM: ', bpm, ' Steps: ', windowFrameInSteps)

    clearInterval(timer)
    timer = setInterval(() => tick(), (60 / bpm) * windowFrameInSteps * 1000)

    function tick() {
      const {
        viewSettings: { currentSceneIdx, registeredClips }
      } = getState()
      if (currentSceneIdx !== null) {
        dispatch(toggleIsScenePlaying({ sceneIdx: currentSceneIdx }))
        dispatch(changeCurrentScene({ currentSceneIdx: null }))
      }
      if (registeredClips.length > 0) {
        //console.log('tick ')
        dispatch(toggleIsPlayingList({ clips: registeredClips }))

        dispatch(clearRegisteredClips())
      }
    }
  }
}
