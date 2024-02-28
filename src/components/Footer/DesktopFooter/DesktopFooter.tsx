import { faDiscord, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function DesktopFooter() {
  //? Translation
  const { t } = useTranslation('footer')

  return (
    <div className='w-full bg-lightWhite700 pb-12 pt-12 duration-200 dark:bg-darkGray700'>
      <div className='container'>
        <div className=' lg:gap-2 lg:text-xl xl:gap-4 xl:text-2xl grid grid-cols-5 gap-1 text-sm font-medium uppercase text-black duration-200 dark:text-white'>
          <div className='col-span-1 flex items-center justify-center'>{t('follow us on')}</div>
          <div className='lg:px-4 xl:px-8 col-span-1 flex items-center px-2'>Hareta</div>
          <div className='lg:px-2 lg:text-xl xl:text-2xl col-span-1 flex items-center px-0 text-sm'>
            {t('our main office')}
          </div>
          <div className='xl:px-10 col-span-1 flex items-center px-6'>{t('support')}</div>
          <div className='lg:px-4 xl:px-8 col-span-1 flex items-center px-2'>{t('contact')}</div>
        </div>
        <div className='text-darkText/80 lg:gap-2 lg:text-base xl:gap-4 dark:text-lightText/80 mt-4 grid grid-cols-5 justify-center gap-1 text-xs duration-200'>
          <div className='col-span-1'>
            <div className='lg:space-x-2 lg:text-xl xl:text-2xl flex items-center justify-center space-x-1 text-lg'>
              <Link to='https://www.facebook.com/HaretaWorkshop' target='_blank'>
                <FontAwesomeIcon
                  icon={faFacebook}
                  className='cursor-pointer p-1 hover:text-primaryColor dark:hover:text-primaryColor'
                />
              </Link>
              <Link to='https://www.instagram.com/hareta.workshop/' target='_blank'>
                <FontAwesomeIcon
                  className='cursor-pointer p-1 hover:text-primaryColor dark:hover:text-primaryColor'
                  icon={faInstagram}
                />
              </Link>
              <Link to='' target='_blank'>
                <FontAwesomeIcon
                  className='cursor-pointer p-1 hover:text-primaryColor dark:hover:text-primaryColor'
                  icon={faDiscord}
                />
              </Link>
              <Link to='' target='_blank'>
                <FontAwesomeIcon
                  className='cursor-pointer p-1 hover:text-primaryColor dark:hover:text-primaryColor'
                  icon={faYoutube}
                />
              </Link>
            </div>
          </div>
          <div className='lg:px-4 xl:px-8 col-span-1 flex flex-col space-y-2 px-2'>
            <Link to='hareta.me' className='hover:text-primaryColor dark:hover:text-primaryColor'>
              Hareta workshop
            </Link>
          </div>
          <div className='lg:px-2 col-span-1 px-0'>974 Dong Khoi St, Trang Dai, Bien Hoa, Dong Nai, Viet Nam</div>
          <div className='xl:px-10 col-span-1 flex flex-col space-y-2 px-6'>
            <Link to={path.home}>{t('faq')}</Link>
            <Link to={path.home}>{t('policy and terms')}</Link>
            <Link to={path.home}>{t('order tracking')}</Link>
          </div>
          <div className='lg:px-4 xl:px-8 col-span-1 flex flex-col justify-start space-y-2 px-2'>
            <p>hareta.contact@gmail.com</p>
            <p>0394030604</p>
          </div>
        </div>
        <div className='lg:gap-2 xl:gap-4 relative grid grid-cols-5 gap-1'>
          <div className='lg:space-x-4 col-span-2 flex items-center justify-center space-x-2'>
            <div className='lg:h-40 lg:w-40 relative h-32 w-32'>
              <img
                src='/images/haretaWorkshopLogo.png'
                alt='Hareta'
                className='absolute left-0 top-0 h-full w-full object-scale-down'
              />
            </div>
            <div className='text-darkText/80 dark:text-lightText/80 uppercase duration-200'>
              <p className='lg:text-xl xl:text-2xl text-lg'>hareta</p>
              <p className='lg:text-base  xl:text-lg pl-4 text-sm'>workshop</p>
            </div>
          </div>
          <div className='text-darkText/60 lg:text-sm dark:text-lightText/60 absolute bottom-0 flex w-full items-center justify-center text-xs duration-200'>
            {t('coppyright')}
          </div>
        </div>
      </div>
    </div>
  )
}
