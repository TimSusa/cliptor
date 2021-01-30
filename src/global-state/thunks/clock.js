import { actionsContent, actionsViewSettings } from '../'
const { toggleIsPlayingList } = actionsContent
const { clearRegisteredClips } = actionsViewSettings

export function clock() {
  let timerWorker = null

  return function (dispatch, getState) {
    const {
      viewSettings: { bpm, windowFrameInSteps }
    } = getState()

    timerWorker = getWorker(bpm, windowFrameInSteps)
    timerWorker.onmessage = nextTick
    timerWorker.postMessage('init') // Start the worker.
    timerWorker.postMessage('start')
    console.log(
      'Clock initialized with BPM: ',
      bpm,
      ' and Clip Rate: ',
      windowFrameInSteps
    )
    function nextTick() {
      const {
        viewSettings: { registeredClips }
      } = getState()

      if (registeredClips.length > 0) {
        dispatch(toggleIsPlayingList({ clips: registeredClips }))
        dispatch(clearRegisteredClips())
      }
    }
  }
}

function getWorker(bpm, windowFrameInSteps) {
  const blob = new Blob([
    `var timeoutID=0;function schedule(){timeoutID=setTimeout(function(){postMessage('schedule'); schedule();},${
      (60 / bpm) * windowFrameInSteps * 1000
    });} onmessage = function(e) { if (e.data == 'start') { if (!timeoutID) schedule();} else if (e.data == 'stop') {if (timeoutID) clearTimeout(timeoutID); timeoutID=0;};}`
  ])

  const timerWorkerBlobURL = window.URL.createObjectURL(blob)
  return new Worker(timerWorkerBlobURL)
}
