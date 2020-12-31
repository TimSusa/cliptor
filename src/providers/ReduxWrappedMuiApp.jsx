import React from 'react'
import PropTypes from 'prop-types'
import MuiWrappedApp from './MuiWrappedApp'
import { Provider } from 'react-redux'

import { configureAppStore } from '../global-state/configure-app-store'

ReduxWrappedMuiApp.propTypes = {
  children: PropTypes.any,
  store: PropTypes.object
}

export function ReduxWrappedMuiApp(props) {
  const store = configureAppStore()
  const { store: propsStore, children } = props
  return (
    <Provider store={propsStore || store}>
      {children ? (
        <MuiWrappedApp {...props}>{children}</MuiWrappedApp>
      ) : (
        <MuiWrappedApp {...props} />
      )}
    </Provider>
  )
}
ReduxWrappedMuiApp.displayName = 'ReduxWrappedMuiApp'
export default ReduxWrappedMuiApp
