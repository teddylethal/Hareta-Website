import { faDiscord, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function MobileFooter() {
  //? Translation
  const { t } = useTranslation('footer')

  return (
    <div className='sm:pb-16 w-full bg-[#efefef] pb-14 duration-200 dark:bg-[#303030]'>
      <div className='text-darkText/80 dark:text-lightText/80 flex flex-col duration-200'>
        <div className='border-b border-black/40 dark:border-white/40'>
          <div className='relative grid grid-cols-3 py-2'>
            <div className='sm:px-4 sm:text-base col-span-1 flex items-center px-2 text-sm font-medium uppercase'>
              {t('follow us on')}
            </div>

            {/* <div className='absolute left-1/2 h-full border-l border-black/40 dark:border-white/40' /> */}

            <div className='sm:text-xl col-span-2 flex flex-wrap items-center justify-center space-x-1 text-lg'>
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
        </div>
        <div className='border-b border-black/40 dark:border-white/40'>
          <div className='relative grid grid-cols-3 py-2'>
            <div className='sm:px-4 sm:text-base col-span-1 flex items-center px-2 text-sm font-medium uppercase'>
              Hareta
            </div>

            {/* <div className='absolute left-1/2 h-full border-l border-black/40 dark:border-white/40' /> */}

            <div className='sm:px-4 sm:text-sm col-span-2 flex flex-col space-y-2 px-2 text-xs'>
              <Link to='hareta.me' className='hover:text-primaryColor dark:hover:text-primaryColor'>
                Hareta workshop
              </Link>
            </div>
          </div>
        </div>
        <div className='border-b border-black/40 dark:border-white/40'>
          <div className='relative grid grid-cols-3 py-2'>
            <div className='sm:px-4 sm:text-base col-span-1 flex items-center px-2 text-sm font-medium uppercase'>
              {t('our main office')}
            </div>

            {/* <div className='absolute left-1/2 h-full border-l border-black/40 dark:border-white/40' /> */}

            <div className='sm:px-4 sm:text-sm col-span-2 px-2 text-xs'>
              974 Dong Khoi St, Trang Dai, Bien Hoa, Dong Nai, Viet Nam
            </div>
          </div>
        </div>
        <div className='border-b border-black/40 dark:border-white/40'>
          <div className='relative grid grid-cols-3 py-2'>
            <div className='sm:px-4 sm:text-base col-span-1 flex items-center px-2 text-sm font-medium uppercase'>
              {t('support')}
            </div>

            {/* <div className='absolute left-1/2 h-full border-l border-black/40 dark:border-white/40' /> */}

            <div className='sm:px-4 sm:text-sm col-span-2 flex flex-col space-y-2 px-2 text-xs'>
              <Link to={path.home}>{t('faq')}</Link>
              <Link to={path.home}>{t('policy and terms')}</Link>
              <Link to={path.home}>{t('order tracking')}</Link>
            </div>
          </div>
        </div>
        <div className='overflow-hidden border-b border-black/40 dark:border-white/40'>
          <div className='relative grid grid-cols-3 py-2'>
            <div className='sm:px-4 sm:text-base col-span-1 flex items-center px-2 text-sm font-medium uppercase'>
              {t('contact')}
            </div>

            {/* <div className='absolute left-1/2 h-full border-l border-black/60 dark:border-white/60' /> */}

            <div className='sm:px-4 sm:text-sm col-span-2 flex flex-col space-y-2 px-2 text-xs'>
              <div className='truncate'>hareta.contact@gmail.com</div>
              <p>0394030604</p>
            </div>
          </div>
        </div>
        <div className=''>
          <div className=' lg:space-x-4 flex items-center justify-center space-x-2'>
            <div className='lg:h-40 lg:w-40 relative h-32 w-32'>
              <img
                src='/images/haretaWorkshopLogo.png'
                alt='Hareta'
                className='absolute left-0 top-0 h-full w-full object-scale-down'
              />
            </div>
            <div className='text-darkText/80 dark:text-lightText/80 uppercase'>
              <p className='lg:text-xl xl:text-2xl text-lg'>hareta</p>
              <p className='lg:text-base  xl:text-lg pl-4 text-sm'>workshop</p>
            </div>
          </div>
          <div className=' text-darkText/60 lg:text-sm dark:text-lightText/60 mt-4 flex w-full items-center justify-center text-xs'>
            {t('coppyright')}
          </div>
        </div>
      </div>
    </div>
  )
}
