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

  const className = 'rounded-md px-3 py-2 hover:bg-lightColor900/80 hover:font-semibold dark:hover:bg-darkColor900/80'

  return (
    <div className='relative flex w-64 select-none flex-col space-y-1 rounded-lg bg-lightColor700 p-2 text-base font-medium text-darkText shadow-lg dark:bg-darkColor700 dark:text-lightText tablet:font-medium desktop:w-72 desktop:text-lg'>
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

      <ToggleTheme
        className='h-6 w-6 desktop:h-7 desktop:w-7 desktopLarge:h-8 desktopLarge:w-8'
        classNameWrapper={className}
      />
    </div>
  )
}
