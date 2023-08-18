import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import UserSideNav from '../../components/UserSideNav'
import { Outlet } from 'react-router-dom'

export default function UserLayout() {
  return (
    <div>
      <Header />
      <div className='mt-10 md:mt-12 lg:mt-16'>
        <div className='bg-lightBg dark:bg-darkBg'>
          <div className='container'>
            <div className='mx-2 mt-8 xl:mx-4'>
              <div className='grid grid-cols-12 gap-6 py-4 2xl:py-6'>
                <div className='col-span-3'>
                  <UserSideNav />
                </div>

                <div className='col-span-9'>
                  <div className='min-h-full rounded-md border border-black/10 bg-[#efefef] text-textDark dark:border-white/20 dark:bg-[#181818] dark:text-textLight'>
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
