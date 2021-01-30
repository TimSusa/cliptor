import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
//import PlayIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import context from '../global-state/context'
import { actionsViewSettings, actionsContent } from '../global-state'
//import { clock } from '../global-state/thunks/clock'
import { playbackStates } from '../global-state/reducers/view-settings'
import { clock } from '../global-state/thunks/clock'
import { TimerClockLabel } from './TimerClockLabel'

export const MenuAppBar = MenuAppBarCmp

const { setBpm, setWindowFrameInSteps, setPlaybackState } = actionsViewSettings

const { stopAll } = actionsContent
function MenuAppBarCmp(props) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { audioContext } = useContext(context)
  const classes = makeStyles(styles.bind(this, theme))()
  const { bpm, windowFrameInSteps } = useSelector((state) => state.viewSettings)
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position='fixed'>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            title={'Menu'}
            onClick={props.handleDrawerToggle}
            aria-label='Menu'
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' className={classes.typoColorStyle}>
            Cliptor
          </Typography>

          {process.env.REACT_APP_IS_WEB_MODE === 'true' && (
            <React.Fragment>
              <Typography className={classes.typoColorStyle}>
                ++ WEB-DEMO ++
              </Typography>
              <a
                className={classes.typoColorStyle}
                href={'https://github.com/TimSusa/cliptor/releases'}
              >
                Download here!
              </a>
            </React.Fragment>
          )}

          <div
            style={{
              display: 'flex',
              width: '38%',
              justifyContent: 'space-around'
            }}
          >
            <TextField
              label='BPM'
              type='number'
              inputProps={{
                min: 1,
                max: 200
              }}
              InputLabelProps={{
                shrink: true
              }}
              variant='standard'
              defaultValue={bpm}
              onChange={(e) => {
                dispatch(setBpm({ bpm: e.target.value }))
                dispatch(clock())
              }}
            />
            <TextField
              label='StepTick'
              type='number'
              inputProps={{
                min: 1,
                max: 32
              }}
              InputLabelProps={{
                shrink: true
              }}
              variant='standard'
              defaultValue={windowFrameInSteps}
              onChange={(e) => {
                dispatch(
                  setWindowFrameInSteps({ windowFrameInSteps: e.target.value })
                )
                dispatch(clock())
              }}
            />
            <TimerClockLabel></TimerClockLabel>

            <IconButton
              aria-label='stop'
              onClick={() => {
                audioContext.suspend()
                dispatch(stopAll())
                dispatch(
                  setPlaybackState({
                    playbackState: playbackStates.STOP,
                    currentTimeStamp: audioContext.currentTime
                  })
                )
              }}
            >
              <StopIcon></StopIcon>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div
        style={{
          height: 64
        }}
      />
    </div>
  )
}

MenuAppBarCmp.propTypes = {
  handleDrawerToggle: PropTypes.any
}

function styles(theme) {
  return {
    root: {
      flexGrow: 1
    },
    appBar: {
      background: theme.palette.appBar.background,
      fontWeight: 600
    },
    typoColorStyle: {
      color: theme.palette.primary.contrastText,
      fontWeight: 600,
      flex: 1
    },
    flex: {
      flex: 1
    },
    menuButton: {
      marginLeft: 0,
      marginRight: theme.spacing(2)
    },
    resetButton: {
      padding: '0 8px 0 8px',
      marginLeft: theme.spacing(2),
      height: 32,
      textTransform: 'none',
      fontSize: '12px',
      overflow: 'hidden',
      color: theme.palette.primary.contrastText
    }
  }
}
