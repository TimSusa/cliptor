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
  registerClip(state, { payload: { clip } }) {
    if (state.registeredClips.every((item) => item.clipId !== clip.clipId)) {
      state.registeredClips = [...state.registeredClips, clip]
    }
  },
  clearRegisteredClips(state) {
    state.registeredClips = []
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
