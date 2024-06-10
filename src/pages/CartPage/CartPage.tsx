import { useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import PathBar from 'src/components/PathBar'
import CartForUser from './children/CartForUser'
import { useTranslation } from 'react-i18next'
import CartForGuest from './children/CartForGuest'

export default function CartPage() {
  const { isAuthenticated } = useContext(AppContext)

  //! Multi languages
  const { t } = useTranslation('cart')

  //! Change title
  useEffect(() => {
    document.title = `${t('path.cart')} | Hareta Workshop`
  })

  return (
    <div className='bg-lightBg py-2 duration-200 dark:bg-darkBg desktop:py-3 desktopLarge:py-4'>
      <div className='container space-y-6'>
        <PathBar pathList={[{ pathName: t('path.cart'), url: '/cart' }]} />
        {isAuthenticated && <CartForUser />}
        {!isAuthenticated && <CartForGuest />}
      </div>
    </div>
  )
}
