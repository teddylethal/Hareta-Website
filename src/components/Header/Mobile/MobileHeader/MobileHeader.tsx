import BackButton from 'src/components/BackButton'
import MobileCart from '../MobileCart'
import MobileNav from '../MobileNav'

export default function MobileHeader() {
  return (
    <div className='grid h-full w-full grid-cols-3 items-center px-2'>
      <div className='col-span-1 flex items-center justify-start'>
        <BackButton />
      </div>
      <div className='col-span-1 flex items-center justify-center'>
        <MobileCart />
      </div>
      <div className='col-span-1 flex items-center justify-end'>
        <MobileNav />
      </div>
    </div>
  )
}
