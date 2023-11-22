import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'
import { Link as ScrollLink } from 'react-scroll'
import { privacyPath } from 'src/constants/path'

interface Props {
  closeMenu?: () => void
}

export default function PrivacyAndTermsSideNav({ closeMenu }: Props) {
  //? translation
  const { t } = useTranslation('privacyAndTerms')

  const handleClose = () => {
    closeMenu && closeMenu()
  }

  const navClassname =
    'flex w-full cursor-pointer items-center space-x-2 p-2 text-sm hover:bg-white dark:hover:bg-black lg:p-3 lg:text-base xl:p-4 xl:text-lg rounded-lg'
  const activeClassname = 'font-semibold text-haretaColor dark:text-haretaColor'
  return (
    <div className='flex flex-col'>
      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.ProductInformation}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.ProductInformation')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.OrderingAndPayments}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.OrderingAndPayments')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.ShippingAndDelivery}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.ShippingAndDelivery')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.ReturnsAndRefunds}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.ReturnsAndRefunds')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.ProductWarranty}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.ProductWarranty')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.IntellectualProperty}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.IntellectualProperty')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.InformationCollection}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.InformationCollection')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.UseOfInformation}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.UseOfInformation')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.DataProtection}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.DataProtection')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.SharingOfInformation}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.SharingOfInformation')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.CookiesAndTracking}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.CookiesAndTracking')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.ThirdPartyLinks}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.ThirdPartyLinks')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.ChildrenPrivacy}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.ChildrenPrivacy')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.ChangeToThePrivacyPolicy}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.ChangeToThePrivacyPolicy')}</p>
      </ScrollLink>

      <ScrollLink
        onClick={handleClose}
        className={navClassname}
        activeClass={activeClassname}
        to={privacyPath.TermAndConditions}
        spy={true}
        smooth={true}
        offset={-60}
        duration={500}
      >
        <FontAwesomeIcon icon={faChevronRight} />
        <p className='font-medium '>{t('title.TermAndConditions')}</p>
      </ScrollLink>
    </div>
  )
}
