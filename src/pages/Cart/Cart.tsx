import { Fragment, useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import AuthenitcatedCart from './AuthenticatedCart'
import UnauthenticatedCart from './UnauthenticatedCart'

export default function Cart() {
  const { isAuthenticated } = useContext(AppContext)

  return (
    <Fragment>
      {isAuthenticated && <AuthenitcatedCart />}
      {!isAuthenticated && <UnauthenticatedCart />}
    </Fragment>
  )
}
