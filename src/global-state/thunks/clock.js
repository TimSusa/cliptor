import { actionsContent, actionsViewSettings } from '../'

const { toggleIsScenePlaying } = actionsContent
const { changeCurrentScene } = actionsViewSettings

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
        viewSettings: { currentSceneIdx }
      } = getState()
      if (currentSceneIdx !== null) {
        dispatch(toggleIsScenePlaying({ sceneIdx: currentSceneIdx }))
        dispatch(changeCurrentScene({ currentSceneIdx: null }))
      }
    }
  }
}
