import { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import PathBar from 'src/components/PathBar'
import AuthenticatedCart from './AuthenticatedCart'
import UnauthenticatedCart from './UnauthenticatedCart'
import { useTranslation } from 'react-i18next'

export default function Cart() {
  const { isAuthenticated } = useContext(AppContext)

  //? transaltion
  const { t } = useTranslation('cart')

  //? CHANGE TITLE
  useEffect(() => {
    document.title = `${t('path.cart')} | Hareta Workshop`
  })

  return (
    <div className='bg-lightBg py-2 duration-200 dark:bg-darkBg desktop:py-3 desktopLarge:py-4'>
      <div className='container'>
        <PathBar
          pathList={[
            { pathName: t('path.home'), url: '/' },
            { pathName: t('path.cart'), url: '/cart' }
          ]}
        />
        {isAuthenticated && <AuthenticatedCart />}
        {!isAuthenticated && <UnauthenticatedCart />}
      </div>
    </div>
  )
}
