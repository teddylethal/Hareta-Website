import { faDiscord, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function MobileFooter() {
  return (
    <div className='w-full bg-[#efefef] pb-14 duration-500 dark:bg-[#303030] sm:pb-16'>
      <div className='flex flex-col text-textDark/80 duration-500 dark:text-textLight/80'>
        <div className='border-b border-black/40 dark:border-white/40'>
          <div className='relative grid grid-cols-3 py-2'>
            <div className='col-span-1 flex items-center px-2 text-sm font-medium uppercase sm:px-4 sm:text-base'>
              Follow us on
            </div>

            {/* <div className='absolute left-1/2 h-full border-l border-black/40 dark:border-white/40' /> */}

            <div className='col-span-2 flex flex-wrap items-center justify-center space-x-1 text-lg sm:text-xl'>
              <Link to='https://www.facebook.com/HaretaWorkshop' target='_blank'>
                <FontAwesomeIcon
                  icon={faFacebook}
                  className='cursor-pointer p-1 hover:text-brownColor dark:hover:text-haretaColor'
                />
              </Link>
              <Link to='https://www.instagram.com/hareta.workshop/' target='_blank'>
                <FontAwesomeIcon
                  className='cursor-pointer p-1 hover:text-brownColor dark:hover:text-haretaColor'
                  icon={faInstagram}
                />
              </Link>
              <Link to='' target='_blank'>
                <FontAwesomeIcon
                  className='cursor-pointer p-1 hover:text-brownColor dark:hover:text-haretaColor'
                  icon={faDiscord}
                />
              </Link>
              <Link to='' target='_blank'>
                <FontAwesomeIcon
                  className='cursor-pointer p-1 hover:text-brownColor dark:hover:text-haretaColor'
                  icon={faYoutube}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className='border-b border-black/40 dark:border-white/40'>
          <div className='relative grid grid-cols-3 py-2'>
            <div className='col-span-1 flex items-center px-2 text-sm font-medium uppercase sm:px-4 sm:text-base'>
              Hareta
            </div>

            {/* <div className='absolute left-1/2 h-full border-l border-black/40 dark:border-white/40' /> */}

            <div className='col-span-2 flex flex-col space-y-2 px-2 text-xs sm:px-4 sm:text-sm'>
              <Link to='hareta.me' className='hover:text-brownColor dark:hover:text-haretaColor'>
                Hareta workshop
              </Link>
            </div>
          </div>
        </div>
        <div className='border-b border-black/40 dark:border-white/40'>
          <div className='relative grid grid-cols-3 py-2'>
            <div className='col-span-1 flex items-center px-2 text-sm font-medium uppercase sm:px-4 sm:text-base'>
              Our main office
            </div>

            {/* <div className='absolute left-1/2 h-full border-l border-black/40 dark:border-white/40' /> */}

            <div className='col-span-2 px-2 text-xs sm:px-4 sm:text-sm'>

              974 Dong Khoi St, Trang Dai, Bien Hoa, Dong Nai, Viet Nam
            </div>
          </div>
        </div>
        <div className='border-b border-black/40 dark:border-white/40'>
          <div className='relative grid grid-cols-3 py-2'>
            <div className='col-span-1 flex items-center px-2 text-sm font-medium uppercase sm:px-4 sm:text-base'>
              Support
            </div>

            {/* <div className='absolute left-1/2 h-full border-l border-black/40 dark:border-white/40' /> */}

            <div className='col-span-2 flex flex-col space-y-2 px-2 text-xs sm:px-4 sm:text-sm'>

              <Link to={path.home}>FAQ</Link>
              <Link to={path.home}>Policy and terms</Link>
              <Link to={path.home}>Order tracking</Link>
            </div>
          </div>
        </div>
        <div className='overflow-hidden border-b border-black/40 dark:border-white/40'>
          <div className='relative grid grid-cols-2 py-2'>
            <div className='col-span-1 flex items-center px-2 text-sm font-medium uppercase sm:px-4 sm:text-base'>
              Contact
            </div>

            {/* <div className='absolute left-1/2 h-full border-l border-black/60 dark:border-white/60' /> */}

            <div className='col-span-2 flex flex-col space-y-2 px-2 text-xs sm:px-4 sm:text-sm'>
              <div className='truncate'>hareta.contact@gmail.com</div>
              <p>0394030604</p>
            </div>
          </div>
        </div>
        <div className=''>
          <div className=' flex items-center justify-center space-x-2 lg:space-x-4'>
            <div className='relative h-32 w-32 lg:h-40 lg:w-40'>
              <img
                src='/images/haretaWorkshopLogo.png'
                alt='Hareta'
                className='absolute left-0 top-0 h-full w-full object-scale-down'
              />
            </div>
            <div className='uppercase text-textDark/80 dark:text-textLight/80'>
              <p className='text-lg lg:text-xl xl:text-2xl'>hareta</p>
              <p className='pl-4  text-sm lg:text-base xl:text-lg'>workshop</p>
            </div>
          </div>
          <div className=' mt-4 flex w-full items-center justify-center text-xs text-textDark/60 dark:text-textLight/60 lg:text-sm'>
            Copyright © 2023 Hareta Workshop. All rights reserved
          </div>
        </div>
      </div>
    </div>
  )
}
