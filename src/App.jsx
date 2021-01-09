import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTheme } from '@material-ui/styles'
import { makeStyles } from '@material-ui/styles'
import { Matrix } from './matrix/Matrix'
import MenuAppBar from './menu-app-bar/MenuAppBar'
import Drawer from '@material-ui/core/Drawer'
import DrawerList from './drawer-list/DrawerList'

import { clock } from './global-state/thunks/clock'
import { isSafari } from './utils/is-safari'

export function App() {
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = makeStyles(styles.bind(this, theme))()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  /*eslint-disable*/
  useEffect(() => {
    if (isSafari()) {
      alert(
        'Dear User, \n\nSafari and iOS Browsers are not supported. Please, consider using Android or a macOSX, win or raspberryPI hardware.'
      )
    }
    dispatch(clock())
  }, [])
  /*eslint-enable*/
  return (
    <div className={classes.root}>
      <div className={classes.appBar}>
        <MenuAppBar handleDrawerToggle={() => setIsMobileOpen(!isMobileOpen)} />
        <Drawer
          variant='temporary'
          anchor={'left'}
          open={isMobileOpen}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={() => setIsMobileOpen(!isMobileOpen)}
        >
          <DrawerList
            onFileChange={() => setIsMobileOpen(false)}
            handleSaveFile={() => setIsMobileOpen(false)}
            handleResetSliders={() => setIsMobileOpen(false)}
            classes={classes}
            onClose={() => setIsMobileOpen(!isMobileOpen)}
          />
        </Drawer>
        <Matrix />
      </div>
    </div>
  )
}

function styles(theme) {
  return {
    root: {
      width: '100%',
      height: '100%',
      zIndex: 1
    },
    appFrame: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      position: 'absolute',
      right: 0,
      left: 0,
      margin: 0
    },
    navIconHide: {},
    drawerHeader: {
      ...theme.mixins.toolbar
    },
    drawerPaper: {
      width: 250,
      backgroundColor: theme.palette.background.default,
      color: theme.palette.primary.contrastText
    },
    iconColor: {
      color: theme.palette.primary.contrastText
    },
    content: {
      backgroundColor: theme.palette.background.default,
      width: '100%',
      marginTop: theme.spacing(1)
    }
  }
}
