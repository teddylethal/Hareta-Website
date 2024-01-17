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

  //? Translation
  const { t } = useTranslation(['support'])

  //? Responsive
  const isMobile = useViewport().width < 768

  return (
    <div className='bg-lightBg py-2 text-textDark duration-300 dark:bg-darkBg dark:text-textLight md:py-3 xl:py-4'>
      <div className='container'>
        <PathBar
          pathList={[
            { pathName: t('path.home'), url: '/' },
            { pathName: isMobile ? t('path.order tracking--mobile') : t('path.order tracking'), url: '/order-tracking' }
          ]}
        />

        <div className='flex flex-col space-y-6 py-2 md:space-y-10 md:py-4 xl:space-y-10 xl:py-6'>
          <p className='upperacse w-full text-center font-medium uppercase text-haretaColor md:text-xl xl:text-2xl'>
            {t('order.content')}
          </p>

          <SearchOrder setCantFind={setCantFind} setFinding={setFinding} />

          <div className='md:px-12 xl:px-24'>
            {isAuthenticated && <OrderTrackingForUser />}

            {!isAuthenticated && (
              <div className='flex flex-col items-center justify-center px-2 md:px-20 xl:px-32'>
                <FontAwesomeIcon
                  icon={faRectangleList}
                  className='h-auto w-40 text-textDark/60 dark:text-textLight/60 md:w-60 xl:w-80'
                />
                <div className='mt-2 justify-center space-y-1 text-center font-medium md:text-lg xl:text-xl'>
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
                  className='fixed left-1/2 top-1/2 z-10 flex w-10/12 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center md:w-1/2'
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
                  <div className='mt-4 line-clamp-2 text-center text-lg font-semibold uppercase text-textDark dark:text-textLight md:text-2xl xl:text-4xl'>
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
          classNameWrapper='relative w-[90%] px-2 md:px-6 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
        >
          <div className='mt-4 flex w-full justify-center'>
            <img src='/images/cant-find-item.png' alt='No item' className='h-auto w-40 md:w-72 ' />
          </div>
          <div className='w-full text-center text-sm uppercase sm:text-base md:text-lg xl:text-xl'>
            <p className='font-semibold text-red-600'>{t('order.Cannot find your order')}</p>
            <p className='mt-1'>{t('order.Please check your order ID')}</p>
          </div>
        </DialogPopup>
      </div>
    </div>
  )
}
