import { useContext } from 'react'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { OrderContext } from 'src/contexts/order.context'

export default function Payment() {
  const { confirmPayment, setConfirmPayment } = useContext(OrderContext)

  return (
    <div className='p-3 text-textDark dark:text-textLight xl:p-4'>
      <p className='text-1xl w-full text-center font-bold uppercase lg:text-2xl xl:text-4xl'>payment method</p>
      <div className='my-6 w-full border-t border-black/60 dark:border-white/60'></div>
      <div className='h-full py-4 text-base uppercase lg:text-lg xl:text-xl'>
        <div className=''>
          <p className=''>
            At the moment we only accept{' '}
            <span className='font-medium text-brownColor dark:text-haretaColor'>online payment</span> due to our{' '}
            <Link
              to={path.home}
              className='font-medium text-brownColor/80 hover:text-brownColor dark:text-haretaColor/80 dark:hover:text-haretaColor/60'
            >
              payment policy
            </Link>
          </p>
        </div>
        <div className='mt-4'>
          <p className='font-medium uppercase'>PLEASE COMPLETE YOUR PAYMENT IN 24 HOURS AFTER PLACING YOUR ORDER</p>
          <div className='mt-6 grid grid-cols-2 gap-6 text-base lg:gap-12 xl:text-lg'>
            <div className='col-span-1 justify-center space-y-2'>
              <div className='w-full text-center text-lg font-bold xl:text-xl'>national payment</div>
              <div className='w-full text-center text-lg font-bold xl:text-xl'>(Vietnam)</div>

              <div className='relative w-full pt-[100%]'>
                <img src='/images/hareta_qrcode.png' alt='QR CODE' className='absolute left-0 top-0 h-full w-full' />
              </div>
              <div className='w-full text-center'>or</div>
              <div className='w-full justify-center text-lg font-medium lg:text-xl'>
                <p className='w-full text-center'>vietcombank</p>
                <p className='w-full text-center'>9394030604</p>
                <p className='w-full text-center'>le tien thanh</p>
              </div>
            </div>
            <div className='col-span-1 justify-center space-y-2'>
              <div className='w-full text-center text-lg font-bold xl:text-xl'>international payment</div>
              <div className='w-full text-center text-lg font-bold xl:text-xl'>(paypal)</div>

              <div className='relative w-full pt-[100%]'>
                <img src='/images/hareta_qrcode.png' alt='QR CODE' className='absolute left-0 top-0 h-full w-full' />
              </div>
              <div className='w-full text-center'>or</div>
              <p className='font-medium normal-case'>paypal.me/thanhletien364</p>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4 flex items-center space-x-2'>
        <input
          name='confirm'
          type='checkbox'
          className='h-5 w-5 accent-haretaColor'
          checked={confirmPayment}
          onChange={() => setConfirmPayment(!confirmPayment)}
        />
        <p className=''>
          By clicking, you accept our{' '}
          <Link
            to={path.home}
            className='font-medium text-brownColor/80 hover:text-brownColor dark:text-haretaColor/80 dark:hover:text-haretaColor/60'
          >
            payment policy
          </Link>{' '}
        </p>
      </div>

      <div className='mt-4 text-lg font-semibold xl:text-xl'>
        <p className=''>
          Any transactions made before placing an order will{' '}
          <span className='text-brownColor dark:text-haretaColor'>NOT BE ACCEPTED</span>
        </p>
      </div>
      <div className='flex w-full justify-start py-8'>
        <Link
          to={path.shippingInfor}
          type='button'
          className='flex items-center justify-center rounded-lg bg-vintageColor/80 px-4 py-2 text-base capitalize text-textLight hover:bg-vintageColor dark:bg-haretaColor/80 dark:hover:bg-haretaColor/60 xl:text-lg'
        >
          Back to shipping information
        </Link>
      </div>
    </div>
  )
}
