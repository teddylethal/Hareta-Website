import UserSideNav from '../../components/UserSideNav'
import { ReactNode, useEffect } from 'react'
import { useViewport } from 'src/hooks/useViewport'
import UserMobileNavBar from '../../components/UserMobileNavBar'
import PathBar from 'src/components/PathBar'
import { useTranslation } from 'react-i18next'

interface Props {
  children?: ReactNode
}

export default function UserLayout({ children }: Props) {
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  //! translation
  const { t } = useTranslation('user')

  //! CHANGE TITLE
  useEffect(() => {
    document.title = `${t('path.user')} | Hareta Workshop`
  })

  if (isMobile) {
    return (
      <div className='bg-lightBg dark:bg-darkBg'>
        <div className='container'>
          <div className='pt-2'>
            <PathBar
              pathList={[
                { pathName: t('path.home'), url: '/' },
                { pathName: t('path.user'), url: '/user' }
              ]}
            />
            <div className='pb-6'>
              <UserMobileNavBar />

              <div className='mt-2 rounded-md border border-black/10 bg-[#f8f8f8] text-darkText dark:border-white/20 dark:bg-[#181818] dark:text-lightText'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='bg-lightBg dark:bg-darkBg'>
        <div className='container'>
          <div className='pb-6 pt-2 desktop:pb-8 desktopLarge:pb-10'>
            <PathBar
              pathList={[
                { pathName: t('path.home'), url: '/' },
                { pathName: t('path.user'), url: '/user' }
              ]}
            />

            <div className='grid grid-cols-12 gap-6 '>
              <div className='col-span-3'>
                <UserSideNav />
              </div>

              <div className='col-span-9'>
                <div className='min-h-full rounded-md border border-black/10 bg-[#f8f8f8] text-darkText dark:border-white/20 dark:bg-[#181818] dark:text-lightText'>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
