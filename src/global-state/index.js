import { combineReducers } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
import { viewSettings, viewSettingsInitState } from './reducers/view-settings'
import { content } from './reducers/content'

//
// content
//
//
const { reducer: reducerContent, actions: actionsContents } = createSlice({
  name: 'content',
  initialState: {
    tracks: []
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
