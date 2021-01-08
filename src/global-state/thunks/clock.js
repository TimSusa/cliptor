import { actionsContent, actionsViewSettings } from '../'

const {
  toggleIsScenePlaying,
  // toggleIsPlaying,
  toggleIsPlayingList
} = actionsContent
const { changeCurrentScene, clearRegisteredClips } = actionsViewSettings

export function clock() {
  let timerWorker = null

  return function (dispatch, getState) {
    const {
      viewSettings: { bpm, windowFrameInSteps }
    } = getState()
    // let timer = null

    console.log('clock with BPM: ', bpm, ' Steps: ', windowFrameInSteps)

    var timerWorkerBlob = new Blob([
      `var timeoutID=0;function schedule(){timeoutID=setTimeout(function(){postMessage('schedule'); schedule();},${
        (60 / bpm) * windowFrameInSteps * 1000
      });} onmessage = function(e) { if (e.data == 'start') { if (!timeoutID) schedule();} else if (e.data == 'stop') {if (timeoutID) clearTimeout(timeoutID); timeoutID=0;};}`
    ])

    // Obtain a blob URL reference to our worker 'file'.
    var timerWorkerBlobURL = window.URL.createObjectURL(timerWorkerBlob)

    timerWorker = new Worker(timerWorkerBlobURL)
    timerWorker.onmessage = tick
    timerWorker.postMessage('stop')
    timerWorker.postMessage('init') // Start the worker.
    timerWorker.postMessage('start')
    // TODO: Solution is pretty shitty for small devices, so put this into a webworker like:
    // https://stackoverflow.com/questions/38373918/web-workers-to-make-setinterval-work-as-normal
    // https://github.com/facebook/create-react-app/issues/3660
    // clearInterval(timer)

    // timer = setInterval(() => tick(), (60 / bpm) * windowFrameInSteps * 1000)

    function tick() {
      //console.log('tick with event: ', evt.timeStamp)
      const {
        viewSettings: { currentSceneIdx, registeredClips }
      } = getState()
      // eslint-disable-next-line no-undef
      //timerWorker.postMessage('start')
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
