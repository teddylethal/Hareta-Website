/* eslint-disable @typescript-eslint/no-explicit-any */
import { useViewport } from 'src/hooks/useViewport'
import ProductInformation from '../../components/PrivacyAndTermsComponents/ProductInformation'
import OrderingAndPayments from '../../components/PrivacyAndTermsComponents/OrderingAndPayments'
import ShippingAndDelivery from '../../components/PrivacyAndTermsComponents/ShippingAndDelivery'
import ReturnsAndRefunds from '../../components/PrivacyAndTermsComponents/ReturnsAndRefunds'
import ProductWarranty from '../../components/PrivacyAndTermsComponents/ProductWarranty'
import IntellectualProperty from '../../components/PrivacyAndTermsComponents/IntellectualProperty'
import InformationCollection from '../../components/PrivacyAndTermsComponents/InformationCollection'
import UseOfInformation from '../../components/PrivacyAndTermsComponents/UseOfInformation'
import DataProtection from '../../components/PrivacyAndTermsComponents/DataProtection'
import SharingOfInformation from '../../components/PrivacyAndTermsComponents/SharingOfInformation'
import CookiesAndTracking from '../../components/PrivacyAndTermsComponents/CookiesAndTracking'
import ThirdPartyLinks from '../../components/PrivacyAndTermsComponents/ThirdPartyLinks'
import ChildrenPrivacy from '../../components/PrivacyAndTermsComponents/ChildrenPrivacy'
import ChangeToThePrivacyPolicy from '../../components/PrivacyAndTermsComponents/ChangeToThePrivacyPolicy'
import TermAndConditions from '../../components/PrivacyAndTermsComponents/TermAndConditions'
import classNames from 'classnames'
import PrivacyAndTermsSideNav from '../../components/PrivacyAndTermsSideNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
import { Element } from 'react-scroll'
import { privacyPath } from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import useClickOutside from 'src/hooks/useClickOutside'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useScrollDirection } from 'src/hooks/useScrollDirection'

export default function PrivacyAndTerms() {
  const { theme } = useContext(AppContext)
  //? responsive
  const isMobile = useViewport().width < 768

  //! Multi languages
  const { t } = useTranslation('privacyAndTerms')

  //? navigate side bar
  const { visible, setVisible, ref } = useClickOutside(false)
  const openMenu = () => {
    setVisible(true)
  }
  const closeMenu = () => {
    setVisible(false)
  }

  //? handle scroll up
  const scrollDirection = useScrollDirection()

  return (
    <div className='relative bg-lightBg py-2 text-darkText duration-200 dark:bg-darkBg dark:text-lightText tablet:py-3 desktopLarge:py-4'>
      {isMobile && (
        <AnimatePresence>
          <button
            className={classNames('sticky left-1 rounded-md bg-white p-2 duration-200 dark:bg-black', {
              'top-12': scrollDirection == 'up',
              ' top-1': !(scrollDirection == 'up')
            })}
            onClick={openMenu}
          >
            <FontAwesomeIcon icon={faBarsStaggered} />
          </button>
        </AnimatePresence>
      )}
      <div className='container'>
        <div
          className={classNames('pb-6 tablet:pb-10 desktopLarge:pb-12', {
            'grid grid-cols-12 gap-2 desktop:gap-3 desktopLarge:gap-4 ': !isMobile
          })}
        >
          {!isMobile && (
            <div className='col-span-3'>
              <div className='sticky left-0 top-8 mt-2 flex w-full flex-col space-y-4 overflow-auto border-r border-black/20 duration-200 dark:border-white/20 tablet:top-14 desktop:top-20'>
                <PrivacyAndTermsSideNav />
              </div>
            </div>
          )}
          {isMobile && (
            <AnimatePresence>
              {visible && (
                <Fragment>
                  <motion.div
                    className='fixed inset-0'
                    initial={{ opacity: 0, backgroundColor: 'black' }}
                    animate={{
                      opacity: 0.4
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className='fixed left-0 top-0 z-10 flex h-full w-[70%] overflow-hidden rounded-l-md py-2 shadow-md tabletSmall:w-[60%]'
                    initial={{ opacity: 0, x: '-20%' }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      backgroundColor: theme === 'dark' ? '#202020' : '#efefef',
                      color: theme === 'dark' ? '#eeeeee' : '#222222'
                    }}
                    exit={{ opacity: 0, x: '-20%' }}
                    transition={{ duration: 0.3 }}
                    ref={ref}
                  >
                    <PrivacyAndTermsSideNav closeMenu={closeMenu} />
                    <div className='absolute right-0 flex h-10 space-x-2 p-2'>
                      <button onClick={closeMenu}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='h-6 w-6'
                        >
                          <path
                            fillRule='evenodd'
                            d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                </Fragment>
              )}
            </AnimatePresence>
          )}

          {/* Element components that act as scroll targets */}
          <div
            className={classNames({
              'flex flex-col space-y-6 tablet:space-y-10 desktopLarge:space-y-16': isMobile,
              'col-start-4 col-end-13 flex flex-col space-y-6 desktop:space-y-8 desktopLarge:space-y-10': !isMobile
            })}
          >
            <div className='mt-2 text-center text-xl font-bold uppercase text-haretaColor tablet:text-2xl desktopLarge:text-4xl'>
              {t('title.Privacy and terms')}
            </div>
            <Element name={privacyPath.ProductInformation}>
              <ProductInformation />
            </Element>
            <Element name={privacyPath.OrderingAndPayments}>
              <OrderingAndPayments />
            </Element>
            <Element name={privacyPath.ShippingAndDelivery}>
              <ShippingAndDelivery />
            </Element>
            <Element name={privacyPath.ReturnsAndRefunds}>
              <ReturnsAndRefunds />
            </Element>
            <Element name={privacyPath.ProductWarranty}>
              <ProductWarranty />
            </Element>
            <Element name={privacyPath.IntellectualProperty}>
              <IntellectualProperty />
            </Element>
            <Element name={privacyPath.InformationCollection}>
              <InformationCollection />
            </Element>
            <Element name={privacyPath.UseOfInformation}>
              <UseOfInformation />
            </Element>
            <Element name={privacyPath.DataProtection}>
              <DataProtection />
            </Element>
            <Element name={privacyPath.SharingOfInformation}>
              <SharingOfInformation />
            </Element>
            <Element name={privacyPath.CookiesAndTracking}>
              <CookiesAndTracking />
            </Element>
            <Element name={privacyPath.ThirdPartyLinks}>
              <ThirdPartyLinks />
            </Element>
            <Element name={privacyPath.ChildrenPrivacy}>
              <ChildrenPrivacy />
            </Element>
            <Element name={privacyPath.ChangeToThePrivacyPolicy}>
              <ChangeToThePrivacyPolicy />
            </Element>
            <Element name={privacyPath.TermAndConditions}>
              <TermAndConditions />
            </Element>
          </div>
          <div className='col-start-1 col-end-13 text-center'>
            <div className='mt-4 tablet:mt-8 desktopLarge:mt-12'>
              <p className='text-lg font-bold uppercase text-haretaColor tablet:text-xl desktopLarge:text-2xl'>
                {t('Contact.title')}
              </p>
              <p className='text-base font-medium tablet:text-lg desktopLarge:text-xl'>
                {t('Contact.guide')}
                <span className='text-haretaColor'>{t('Contact.hareta.manage@gmail.com')}</span>
              </p>
            </div>
          </div>

          {/* Anchors to trigger scroll actions */}
          {/* <button onClick={scrollToTop}>To the top!</button>
      <br />
      <button onClick={scrollToBottom}>To the bottom!</button>
      <br /> */}
        </div>
      </div>
    </div>
  )
}
