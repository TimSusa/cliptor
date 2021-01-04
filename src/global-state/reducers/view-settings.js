export const viewSettings = {
  setBpm(state, { payload: { bpm } }) {
    state.bpm = bpm
  },
  setWindowFrameInSteps(state, { payload: { windowFrameInSteps } }) {
    state.windowFrameInSteps = windowFrameInSteps
  },
  changeCurrentScene(state, { payload: { currentSceneIdx } }) {
    state.currentSceneIdx = currentSceneIdx
  },
  changeTheme(state) {
    const castedVal = !!state.isChangedTheme
    return Object.assign({}, state, {
      isChangedTheme: !castedVal,
      isMidiLearnMode: false
    })
  },
  setAudioDriverOuts(state, { payload: { audioDriverOuts } }) {
    state.audioDriverOuts = audioDriverOuts
  }
}
