export const playbackStates = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  STOP: 'STOP'
}
export const viewSettingsInitState = {
  playbackState: playbackStates.STOP,
  currentTimeStamp: 0.0,
  bpm: 95,
  windowFrameInSteps: 16,
  currentSceneIdx: null,
  registeredClips: [],
  audioDriverOuts: [],

  electronAppSettings: {
    isDevConsoleEnabled: true,
    isAllowedToUpdate: false,
    isAutoDownload: false,
    isAllowedPrerelease: false,
    isAllowedDowngrade: false,
    //isWindowSizeLocked: true,
    windowCoords: [0, 0, 600, 800]
  }
}

export const viewSettings = {
  setPlaybackState(state, { payload: { playbackState, currentTimeStamp } }) {
    state.playbackState = playbackState
    state.currentTimeStamp = currentTimeStamp
  },
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
