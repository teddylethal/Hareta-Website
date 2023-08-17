import { faBagShopping, faHeart, faUser, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function Profile() {
  const [isEditing, setIsEditing] = useState<boolean>(false)
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
                <div className=' relative mx-8 my-16 rounded-lg bg-lightBg p-4 dark:bg-darkBg'>
                  <div className='relative -top-10 flex items-center justify-between'>
                    <div className='flex items-center'>
                      <div className='h-32 w-32 rounded-full border-[5px] border-[#efefef] dark:border-[#101010]'>
                        <img
                          src='https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1685458010/autoexpress/2023/05/Porsche%20911%20GTS%20UK%20001_otx6j7.jpg'
                          alt='Name'
                          className='h-full w-full rounded-full  object-cover '
                        />
                      </div>
                      <div className='ml-8 flex flex-col space-y-1'>
                        <p className='text-2xl'>Tran Anh Khoi</p>
                        <p className='text-textDark/60 dark:text-textLight/60'>Joined in 10/08/2004</p>
                      </div>
                    </div>
                    <div className='right-0'>
                      <button className='flex h-full space-x-2 rounded-md bg-vintageColor/80 px-4 py-2 text-textLight hover:bg-vintageColor dark:bg-haretaColor/80 dark:text-textDark dark:hover:bg-haretaColor'>
                        <FontAwesomeIcon icon={faUserPen} />
                        <p>Edit Account</p>
                      </button>
                    </div>
                  </div>
                  {/* <form className='space-y-4 rounded-lg bg-[#e8e8e8] px-6 py-4 dark:bg-[#303030]'>
                    <div className=''>
                      <p className='text-lg uppercase text-textDark/60 dark:text-textLight/60'>Email</p>
                      <input>teddy.lethal@gmail.com</input>
                    </div>
                    <div className=''>
                      <p className='text-lg uppercase text-textDark/60 dark:text-textLight/60'>Phone number</p>
                      <p>0394030604</p>
                    </div>
                    <div className=''>
                      <p className='text-lg uppercase text-textDark/60 dark:text-textLight/60'>Password</p>
                      <p>conchonamki</p>
                    </div>
                  </form> */}
                  <div className='space-y-4 rounded-lg bg-[#e8e8e8] px-6 py-4 dark:bg-[#303030]'>
                    <div className=''>
                      <p className='text-lg uppercase text-textDark/60 dark:text-textLight/60'>Email</p>
                      <p>teddy.lethal@gmail.com</p>
                    </div>
                    <div className=''>
                      <p className='text-lg uppercase text-textDark/60 dark:text-textLight/60'>Phone number</p>
                      <p>0394030604</p>
                    </div>
                    <div className=''>
                      <p className='text-lg uppercase text-textDark/60 dark:text-textLight/60'>Password</p>
                      <p>conchonamki</p>
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
