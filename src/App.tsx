import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createContext, useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { CartContext } from './contexts/cart.context'
import { OrderContext } from './contexts/order.context'
import LoadingPage from './components/LoadingPage'

export type ThemeContextType = 'light' | 'dark'
export const ThemeContext = createContext({
  theme: 'dark',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {}
})

function App() {
  const { reset, loadingPage, theme } = useContext(AppContext)
  const { setExtendedPurchases } = useContext(CartContext)
  const { setOrderList, setTempOrderList } = useContext(OrderContext)

  const routeElements = useRouteElements()

  useEffect(() => {
    const resetFunction = () => {
      reset()
      setExtendedPurchases([])

      //? clear order list
      setOrderList([])
    }
    LocalStorageEventTarget.addEventListener('clearLS', resetFunction)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', resetFunction)
    }
  }, [reset, setExtendedPurchases, setOrderList, setTempOrderList])

  useEffect(() => {
    document.title = 'Hareta Workshop'
  }, [])

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      {routeElements}
      <ToastContainer limit={5} />
      {loadingPage && <LoadingPage />}
    </div>
  )
}

export default App
