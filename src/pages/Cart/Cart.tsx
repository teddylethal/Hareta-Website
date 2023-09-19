import React, { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import PathBar from 'src/components/PathBar'
const AuthenticatedCart = React.lazy(() => import('./AuthenticatedCart'))
const UnauthenticatedCart = React.lazy(() => import('./UnauthenticatedCart'))

export default function Cart() {
  const { isAuthenticated } = useContext(AppContext)

  //? CHANGE TITLE
  useEffect(() => {
    document.title = 'Cart | Hareta Workshop'
  })

  return (
    <div className='bg-lightBg py-2 duration-500 dark:bg-darkBg lg:py-3 xl:py-4'>
      <div className='container'>
        <PathBar
          pathList={[
            { pathName: 'home', url: '/' },
            { pathName: 'cart', url: '/cart' }
          ]}
        />
        {isAuthenticated && <AuthenticatedCart />}
        {!isAuthenticated && <UnauthenticatedCart />}
      </div>
    </div>
  )
}
