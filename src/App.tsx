import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createContext, useContext, useEffect, useState } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { CartContext } from './contexts/cart.context'
import PageIsLoading from './components/PageIsLoading'

export type ThemeContextType = 'light' | 'dark'
export const ThemeContext = createContext({
  theme: 'dark',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {}
})

function App() {
  const { reset, pageIsLoading } = useContext(AppContext)
  const { setExtendedPurchases } = useContext(CartContext)

  const [theme, setTheme] = useState('dark')
  const toggleTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
  }
  const routeElements = useRouteElements()

  useEffect(() => {
    const resetFunction = () => {
      reset()
      setExtendedPurchases([])
    }
    LocalStorageEventTarget.addEventListener('clearLS', resetFunction)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', resetFunction)
    }
  }, [reset, setExtendedPurchases])

  useEffect(() => {
    document.title = 'Hareta Workshop'
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'dark' ? 'dark' : 'light'}>
        {routeElements}
        <ToastContainer limit={5} />
        {pageIsLoading && <PageIsLoading />}
      </div>
    </ThemeContext.Provider>
  )
}

export default App
