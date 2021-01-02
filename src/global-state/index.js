import { combineReducers } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
import { viewSettings } from './reducers/view-settings'
import { content } from './reducers/content'

//
// content
//
//
const { reducer: reducerContent, actions: actionsContents } = createSlice({
  name: 'content',
  initialState: {
    tracks: [],
    sceneIdx: null
  },
  reducers: content
})

export const actionsContent = actionsContents

// ViewSettings
//
export const PAGE_TYPES = {
  HOME_MODE: 'HOME_MODE'
  // VIEW_SETTINGS_MODE: 'VIEW_SETTINGS_MODE'
}

export const viewSettingsInitState = {
  bpm: 95,
  windowFrameInSteps: 4,
  currentSceneIdx: null,
  columns: 18,
  availableDrivers: {
    inputs: {
      None: {
        ccChannels: [],
        noteChannels: []
      }
    },
    outputs: {
      None: {
        ccChannels: [],
        noteChannels: []
      }
    }
  },
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
const {
  reducer: reducerViewSettingss,
  actions: actionsViewSettingss
} = createSlice({
  name: 'viewSettings',
  initialState: viewSettingsInitState,
  reducers: viewSettings
})

export const actionsViewSettings = actionsViewSettingss
export const reducerViewSettings = reducerViewSettingss

export const reducer = combineReducers({
  content: reducerContent,
  viewSettings: reducerViewSettings
})
