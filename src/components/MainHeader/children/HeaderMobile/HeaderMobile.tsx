import BackButton from 'src/components/BackButton'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import MobileCart from 'src/components/Header/Mobile/MobileCart'
import MobileCartWithoutLogin from 'src/components/Header/Mobile/MobileCartWithoutLogin'
import MobileNav from 'src/components/Header/Mobile/MobileNav'

export default function HeaderMobile() {
  const { isAuthenticated } = useContext(AppContext)
  return (
    <div className='grid h-full w-full grid-cols-3 items-center px-2'>
      <div className='col-span-1 flex items-center justify-start'>
        <BackButton />
      </div>
      <div className='col-span-1 flex items-center justify-center'>
        {isAuthenticated && <MobileCart />}
        {!isAuthenticated && <MobileCartWithoutLogin />}
      </div>
      <div className='col-span-1 flex items-center justify-end'>
        <MobileNav />
      </div>
    </div>
  )
}
