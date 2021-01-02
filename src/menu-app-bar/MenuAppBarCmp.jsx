import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { actionsViewSettings } from '../global-state'
export const MenuAppBar = MenuAppBarCmp

const { setBpm } = actionsViewSettings
function MenuAppBarCmp(props) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const classes = makeStyles(styles.bind(this, theme))()
  const { bpm } = useSelector((state) => state.viewSettings)
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
              dispatch(setBpm({ bpm: e.target.event }))
            }}
          />
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
