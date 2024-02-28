import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ChangeLanguage from 'src/components/ChangeLanguage'
import ToggleTheme from 'src/components/ToggleTheme'
import path from 'src/constants/path'

interface Props {
  closePopover: () => void
}

export default function SupportPopover({ closePopover }: Props) {
  //? Use translation
  const { t } = useTranslation('header')

  const className = 'rounded-md px-3 py-2 hover:bg-lightWhite900/80 hover:font-semibold dark:hover:bg-darkGray900/80'

  return (
    <div className='text-darkText md:font-medium lg:w-72 lg:text-lg dark:text-lightText relative flex w-64 select-none flex-col space-y-1 rounded-lg bg-lightWhite700 p-2 text-base font-medium shadow-lg dark:bg-darkGray700'>
      {/* <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-darkText dark:hover:bg-[#101010] dark:hover:text-lightText'
      >
        {t('support.about us')}
      </Link> */}

      <Link to={path.privacyAndTerms} className={className} onClick={closePopover}>
        {t('support.privacy & terms')}
      </Link>

      {/* <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-darkText dark:hover:bg-[#101010] dark:hover:text-lightText'
      >
        {t('support.faq')}
      </Link> */}

      {/* <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-darkText dark:hover:bg-[#101010] dark:hover:text-lightText'
      >
        {t('support.contact us')}
      </Link> */}

      <Link to={path.orderTracking} className={className} onClick={closePopover}>
        {t('support.order tracking')}
      </Link>

      <ChangeLanguage closePopover={closePopover} />

      <ToggleTheme className='lg:h-7 lg:w-7 xl:h-8 xl:w-8 h-6 w-6' classNameWrapper={className} />
    </div>
  )
}
