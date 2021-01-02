export const viewSettings = {
  setBpm(state, { payload: { bpm } }) {
    state.bpm = bpm
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
  }
}
