import BackButton from 'src/components/BackButton'
import MobileCart from '../MobileCart'
import MobileNav from '../MobileNav'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import MobileCartWithoutLogin from '../MobileCartWithoutLogin'

export default function MobileHeader() {
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
