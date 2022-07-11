import { AlertColor } from '@mui/material'
import {
  createContext, FC, useCallback, useState
} from 'react'

const initialSnackbar = {
  open: false,
  message: '',
  alertSeverity: ('success' as AlertColor),
}

export const SnackbarContext = createContext({
  snackbar: initialSnackbar,
  showSnackbar: (severity:AlertColor,message:string) => {},
  hideSnackbar: () => {}
})

export const SnackbarProvider:FC<{children: JSX.Element}> = ({ children }) => {

  const [snackbar, setSnackbar] = useState(initialSnackbar)
    
  const showSnackbar = useCallback((severity:AlertColor,message:string) => {
    setSnackbar({ open: true, message, alertSeverity: severity })
    
  }, [])
  const hideSnackbar = useCallback(() => {
    setSnackbar(initialSnackbar)
  },[])

  return (
    <SnackbarContext.Provider value={{
      snackbar,
      showSnackbar,
      hideSnackbar
    }}>
      {children}
    </SnackbarContext.Provider>)
}
