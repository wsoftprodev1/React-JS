import CloseIcon from '@mui/icons-material/Close'
import { Alert, IconButton, Slide } from '@mui/material'
import MuiSnackbar from '@mui/material/Snackbar'
import { useContext } from 'react'
import { SnackbarContext } from '.'

// animation function
function TransitionSlideRight(props:any) {
  return <Slide {...props} direction='right' />
}

export const CustomSnackbar = () => {
  const { snackbar, hideSnackbar } = useContext(SnackbarContext)
  
  const handleClose = (reason?:string) => {
    if (reason === 'clickaway') {
      return
    }
    hideSnackbar()
  }

  return (
    <MuiSnackbar
      TransitionComponent={TransitionSlideRight}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={(e, v) => handleClose(v)}
    >
      <Alert
        variant='filled'
        severity={snackbar.alertSeverity }
        sx={{
          bgcolor: `${snackbar.alertSeverity}.dark`,
          color: snackbar.alertSeverity === 'warning' ? 'grey.800' : ''
        }}
        action={
          <IconButton size='small' aria-label='close' color='inherit' onClick={() => handleClose()}>
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      >
        {snackbar.message}
      </Alert>
    </MuiSnackbar>
  )
}
