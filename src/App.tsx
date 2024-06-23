import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createContext, useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
import { CartContext } from './contexts/cart.context'
import { OrderContext } from './contexts/order.context'
import LoadingPage from './components/LoadingPage'
import classNames from 'classnames'

export type ThemeContextType = 'light' | 'dark'
export const ThemeContext = createContext({
  theme: 'dark',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {}
})

function App() {
  const { handleLogout, loadingPage, theme } = useContext(AppContext)
  const { setExtendedPurchases } = useContext(CartContext)
  const { setOrderList, setTempOrderList } = useContext(OrderContext)

  const routeElements = useRouteElements()

  useEffect(() => {
    const resetFunction = () => {
      handleLogout()

      // Clear purchase list
      setExtendedPurchases([])

      // Clear order list
      setOrderList([])
    }
    LocalStorageEventTarget.addEventListener('clearLS', resetFunction)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', resetFunction)
    }
  }, [handleLogout, setExtendedPurchases, setOrderList, setTempOrderList])

  return (
    <div
      className={classNames('', theme === 'dark' ? 'dark' : 'light')}
      style={{
        minHeight: 'inherit'
      }}
    >
      {routeElements}
      <ToastContainer limit={3} />
      {loadingPage && <LoadingPage />}
    </div>
  )
}

export default App
