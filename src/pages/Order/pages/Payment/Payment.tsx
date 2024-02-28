import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { useViewport } from 'src/hooks/useViewport'

export default function Payment() {
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  //? translation
  const { t } = useTranslation('order')
  return (
    <div className='text-darkText xl:p-4 dark:text-lightText p-3'>
      <p className='lg:text-2xl xl:text-4xl w-full text-center text-xl font-bold uppercase'>
        {t('layout.Payment method')}
      </p>
      <div className='my-6 w-full border-t border-black/60 dark:border-white/60'></div>
      <div className='lg:text-lg xl:text-xl h-full py-4 text-base uppercase'>
        <div className=''>
          <p className=''>
            {t('payment.At the moment we only accept')}{' '}
            <span className='font-medium text-haretaColor'>{t('payment.Online payment')}</span>{' '}
            {t('payment.due to our')}{' '}
            <Link to={path.home} className='font-medium text-haretaColor hover:text-primaryColor'>
              {t('layout.payment policy')}
            </Link>
          </p>
        </div>
        <div className='mt-4'>
          <p className='font-medium uppercase'>
            {t('payment.PLEASE COMPLETE YOUR PAYMENT IN 48 HOURS AFTER PLACING YOUR ORDER')}
          </p>
          {!isMobile && (
            <div className='lg:gap-12 xl:text-lg mt-6 grid grid-cols-2 gap-6 text-base'>
              <div className='col-span-1 justify-center space-y-2'>
                <div className='xl:text-xl w-full text-center text-lg font-bold'>{t('payment.NATIONAL PAYMENT')}</div>
                <div className='xl:text-xl w-full text-center text-lg font-bold'>{t('payment.(VIETNAM)')}</div>

                <div className='relative w-full pt-[100%]'>
                  <img src='/images/hareta_qrcode.png' alt='QR CODE' className='absolute left-0 top-0 h-full w-full' />
                </div>
                <div className='w-full text-center'>{t('payment.or')}</div>
                <div className='lg:text-xl w-full justify-center text-lg font-medium'>
                  <p className='w-full text-center'>vietcombank</p>
                  <p className='w-full text-center'>9394030604</p>
                  <p className='w-full text-center'>le tien thanh</p>
                </div>
              </div>
              <div className='col-span-1 justify-center space-y-2'>
                <div className='xl:text-xl w-full text-center text-lg font-bold'>
                  {t('payment.INTERNATIONAL PAYMENT')}
                </div>
                <div className='xl:text-xl w-full text-center text-lg font-bold'>(paypal)</div>

                <div className='relative w-full pt-[100%]'>
                  <img src='/images/hareta_qrcode.png' alt='QR CODE' className='absolute left-0 top-0 h-full w-full' />
                </div>
                <div className='w-full text-center'>{t('payment.or')}</div>
                <p className='w-full text-center font-medium normal-case'>paypal.me/thanhletien364</p>
              </div>
            </div>
          )}
          {isMobile && (
            <div className='lg:gap-12 xl:text-lg mt-6 flex flex-col items-center space-y-8 text-base'>
              <div className='flex w-full flex-col items-center space-y-2'>
                <div className='xl:text-xl w-full text-center text-lg font-bold text-haretaColor dark:text-haretaColor'>
                  {t('payment.NATIONAL PAYMENT')}
                </div>
                <div className='xl:text-xl w-full text-center text-lg font-bold'>(Vietnam)</div>

                <div className='relative w-4/5 pt-[80%]'>
                  <img src='/images/hareta_qrcode.png' alt='QR CODE' className='absolute left-0 top-0 h-full w-full' />
                </div>
                <div className='w-full text-center'>{t('payment.or')}</div>
                <div className='lg:text-xl w-full justify-center text-lg font-medium'>
                  <p className='w-full text-center'>vietcombank</p>
                  <p className='w-full text-center'>9394030604</p>
                  <p className='w-full text-center'>le tien thanh</p>
                </div>
              </div>
              <div className='flex w-full flex-col items-center space-y-2'>
                <div className='xl:text-xl w-full text-center text-lg font-bold text-haretaColor dark:text-haretaColor'>
                  {t('payment.INTERNATIONAL PAYMENT')}
                </div>
                <div className='xl:text-xl w-full text-center text-lg font-bold'>(paypal)</div>
                <div className='relative w-4/5 pt-[80%]'>
                  <img src='/images/hareta_qrcode.png' alt='QR CODE' className='absolute left-0 top-0 h-full w-full' />
                </div>
                <div className='w-full text-center'>{t('payment.or')}</div>
                <p className='font-medium normal-case'>paypal.me/thanhletien364</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='xl:text-xl mt-4 text-lg font-semibold'>
        <p className=''>
          {t('payment.Any transactions made before placing an order will')}{' '}
          <span className='text-haretaColor dark:text-haretaColor'>{t('payment.NOT BE ACCEPTED')}</span>
        </p>
      </div>
      {!isMobile && (
        <div className='flex w-full justify-start py-8'>
          <Link
            to={path.shippingInfor}
            type='button'
            className='text-darkText xl:text-lg flex items-center justify-center rounded-lg bg-haretaColor px-4 py-2 text-base font-medium capitalize hover:bg-primaryColor'
          >
            {t('layout.Back to shipping information')}
          </Link>
        </div>
      )}
    </div>
  )
}
