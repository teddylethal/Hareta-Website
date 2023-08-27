import { faDiscord, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function DesktopFooter() {
  return (
    <div className='w-full bg-[#efefef] pb-12 pt-12 duration-500 dark:bg-[#303030]'>
      <div className='container'>
        <div className=' grid grid-cols-5 gap-1 text-sm font-medium uppercase text-black duration-500 dark:text-white lg:gap-2 lg:text-xl xl:gap-4 xl:text-2xl'>
          <div className='col-span-1 flex items-center justify-center'>Follow us on</div>
          <div className='col-span-1 flex items-center px-2 lg:px-4 xl:px-8'>Hareta</div>
          <div className='col-span-1 flex items-center px-0 text-sm lg:px-2 lg:text-xl xl:text-2xl'>
            Our main office
          </div>
          <div className='col-span-1 flex items-center px-6 xl:px-10'>Support</div>
          <div className='col-span-1 flex items-center px-2 lg:px-4 xl:px-8'>Contact</div>
        </div>
        <div className='mt-4 grid grid-cols-5 justify-center gap-1 text-xs text-textDark/80 duration-500 dark:text-textLight/80 lg:gap-2 lg:text-base xl:gap-4'>
          <div className='col-span-1'>
            <div className='flex items-center justify-center space-x-1 text-lg lg:space-x-2 lg:text-xl xl:text-2xl'>
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
          <div className='col-span-1 flex flex-col space-y-2 px-2 lg:px-4 xl:px-8'>
            <Link to='hareta.me' className='hover:text-brownColor dark:hover:text-haretaColor'>
              Hareta workshop
            </Link>
          </div>
          <div className='col-span-1 px-0 lg:px-2'>974 Dong Khoi St, Trang Dai, Bien Hoa, Dong Nai, Viet Nam</div>
          <div className='col-span-1 flex flex-col space-y-2 px-6 xl:px-10'>
            <Link to={path.home}>FAQ</Link>
            <Link to={path.home}>Policy and terms</Link>
            <Link to={path.home}>Order tracking</Link>
          </div>
          <div className='col-span-1 flex flex-col justify-start space-y-2 px-2 lg:px-4 xl:px-8'>
            <p>hareta.contact@gmail.com</p>
            <p>0394030604</p>
          </div>
        </div>
        <div className='relative grid grid-cols-5 gap-1 lg:gap-2 xl:gap-4'>
          <div className='col-span-2 flex items-center justify-center space-x-2 lg:space-x-4'>
            <div className='relative h-32 w-32 lg:h-40 lg:w-40'>
              <img
                src='/images/haretaWorkshopLogo.png'
                alt='Hareta'
                className='absolute left-0 top-0 h-full w-full object-scale-down'
              />
            </div>
            <div className='uppercase text-textDark/80 duration-500 dark:text-textLight/80'>
              <p className='text-lg lg:text-xl xl:text-2xl'>hareta</p>
              <p className='pl-4  text-sm lg:text-base xl:text-lg'>workshop</p>
            </div>
          </div>
          <div className='absolute bottom-0 flex w-full items-center justify-center text-xs text-textDark/60 duration-500 dark:text-textLight/60 lg:text-sm'>
            Copyright © 2023 Hareta Workshop. All rights reserved
          </div>
        </div>
      </div>
    </div>
  )
}
