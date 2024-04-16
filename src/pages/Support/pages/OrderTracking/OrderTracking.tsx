import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { orderApi } from 'src/apis/order.api'
import PathBar from 'src/components/PathBar'
import { Fragment, useContext, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useViewport } from 'src/hooks/useViewport'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavLink, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { formatDate, generateNameId, isAxiosBadRequestError } from 'src/utils/utils'
import { ColorRing } from 'react-loader-spinner'
import { FloatingOverlay, FloatingPortal } from '@floating-ui/react'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList } from '@fortawesome/free-solid-svg-icons'
import { ErrorRespone } from 'src/types/utils.type'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import DialogPopup from 'src/components/DialogPopup'
import OrderTrackingForUser from '../OrderTrackingForUser'
import SearchOrder from '../../components/SearchOrder'

export interface OrderConfig {
  page: string
  limit: string
}

export default function OrderTracking() {
  const { isAuthenticated, theme } = useContext(AppContext)
  const [finding, setFinding] = useState<boolean>(false)
  const [cantFind, setCantFind] = useState<boolean>(false)

  //! Multi languages
  const { t } = useTranslation(['support'])

  //? Responsive
  const isMobile = useViewport().width < 768

  return (
    <div className='bg-lightBg py-2 text-darkText duration-200 dark:bg-darkBg dark:text-lightText tablet:py-3 desktopLarge:py-4'>
      <div className='container'>
        <PathBar
          pathList={[
            { pathName: t('path.home'), url: '/' },
            { pathName: isMobile ? t('path.order tracking--mobile') : t('path.order tracking'), url: '/order-tracking' }
          ]}
        />

        <div className='flex flex-col space-y-6 py-2 tablet:space-y-10 tablet:py-4 desktopLarge:space-y-10 desktopLarge:py-6'>
          <p className='upperacse w-full text-center font-medium uppercase text-haretaColor tablet:text-xl desktopLarge:text-2xl'>
            {t('order.content')}
          </p>

          <SearchOrder setCantFind={setCantFind} setFinding={setFinding} />

          <div className='tablet:px-12 desktopLarge:px-24'>
            {isAuthenticated && <OrderTrackingForUser />}

            {!isAuthenticated && (
              <div className='flex flex-col items-center justify-center px-2 tablet:px-20 desktopLarge:px-32'>
                <FontAwesomeIcon
                  icon={faRectangleList}
                  className='h-auto w-40 text-darkText/60 dark:text-lightText/60 tablet:w-60 desktopLarge:w-80'
                />
                <div className='mt-2 justify-center space-y-1 text-center font-medium tablet:text-lg desktopLarge:text-xl'>
                  <NavLink to={path.login} className='inline font-semibold text-haretaColor'>
                    {t('order.login')}
                  </NavLink>
                  {t('order.message')}
                </div>
              </div>
            )}
          </div>
        </div>
        {finding && (
          <FloatingPortal>
            <FloatingOverlay lockScroll className={theme === 'dark' ? 'dark' : 'light'}>
              <Fragment>
                <motion.div
                  className={classNames('fixed inset-0 z-10 bg-white dark:bg-black', {})}
                  initial={{ opacity: 0.8 }}
                  animate={{
                    opacity: 0.8
                  }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  className='fixed left-1/2 top-1/2 z-10 flex w-10/12 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center tablet:w-1/2'
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ColorRing
                    visible={true}
                    height='80'
                    width='80'
                    ariaLabel='blocks-loading'
                    wrapperStyle={{}}
                    wrapperClass='blocks-wrapper'
                    colors={['#ff6a00', '#ff6a00', '#ff6a00', '#ff6a00', '#ff6a00']}
                  />
                  <div className='mt-4 line-clamp-2 text-center text-lg font-semibold uppercase text-darkText dark:text-lightText tablet:text-2xl desktopLarge:text-4xl'>
                    {t('order.finding order')}
                  </div>
                </motion.div>
              </Fragment>
            </FloatingOverlay>
          </FloatingPortal>
        )}
        <DialogPopup
          isOpen={cantFind}
          handleClose={() => setCantFind(false)}
          classNameWrapper='relative w-[90%] px-2 tablet:px-6 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
        >
          <div className='mt-4 flex w-full justify-center'>
            <img src='/images/cant-find-item.png' alt='No item' className='h-auto w-40 tablet:w-72 ' />
          </div>
          <div className='w-full text-center text-sm uppercase tabletSmall:text-base tablet:text-lg desktopLarge:text-xl'>
            <p className='font-semibold text-red-600'>{t('order.Cannot find your order')}</p>
            <p className='mt-1'>{t('order.Please check your order ID')}</p>
          </div>
        </DialogPopup>
      </div>
    </div>
  )
}
