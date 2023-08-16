import { faBagShopping, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Profile() {
  return (
    <div className='bg-lightBg dark:bg-darkBg'>
      <div className='container'>
        <div className='mx-2 mt-8 xl:mx-4'>
          <div className='grid grid-cols-12 gap-6 py-4 2xl:py-6'>
            <div className='col-span-3'>
              <div className='rounded-md border border-black/10 bg-[#efefef] text-textDark/70 dark:border-white/20 dark:bg-[#101010] dark:text-textLight/70'>
                <div className=''>
                  <button className='flex h-8 items-center space-x-3 px-4 py-8 text-xl font-semibold hover:text-textDark dark:hover:text-textLight'>
                    <FontAwesomeIcon icon={faUser} />
                    <p>Account</p>
                  </button>
                </div>

                <div className='border-y border-black/10 dark:border-white/20'>
                  <button className='flex h-8 items-center space-x-3 px-4 py-8 text-xl font-semibold hover:text-textDark dark:hover:text-textLight'>
                    <FontAwesomeIcon icon={faBagShopping} />
                    <p>Inventory</p>
                  </button>
                </div>
                <div className=''>
                  <button className='flex h-8 items-center space-x-3 px-4 py-8 text-xl font-semibold hover:text-textDark dark:hover:text-textLight'>
                    <FontAwesomeIcon icon={faHeart} />
                    <p>Wishlist</p>
                  </button>
                </div>
              </div>
            </div>

            <div className='col-span-9'>
              <div className='col-span-9 min-h-full rounded-md border border-black/10 bg-[#efefef] px-4 text-textDark dark:border-white/20 dark:bg-[#101010] dark:text-textLight'>
                <div className=' relative mx-8 mt-20 rounded-lg bg-lightBg p-4 dark:bg-darkBg'>
                  <div className='relative -top-10 flex items-center'>
                    <div>
                      <div className='h-32 w-32 rounded-full border-[6px] border-white dark:border-black'>
                        <img
                          src='https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1685458010/autoexpress/2023/05/Porsche%20911%20GTS%20UK%20001_otx6j7.jpg'
                          alt='Name'
                          className=' h-full w-full rounded-full  object-cover '
                        />
                      </div>
                    </div>
                    <div className='ml-8 flex flex-col space-y-1'>
                      <p className='text-2xl'>Tran Anh Khoi</p>
                      <p>Joined in 10/08/2004</p>
                    </div>
                    <div>
                      <button className=''>Change</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
