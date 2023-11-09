import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ChangeLanguage from 'src/components/ChangeLanguage'

interface Props {
  closePopover: () => void
}

export default function SupportPopover({ closePopover }: Props) {
  //? Use translation
  const { t } = useTranslation('header')

  return (
    <div className='relative flex w-52 select-none flex-col rounded-lg bg-[#efefef] p-2 text-base font-medium text-textDark/90 shadow-lg dark:bg-[#202020] dark:text-textLight/90 md:font-medium lg:w-60 lg:text-lg'>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        {t('support.about us')}
      </Link>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        {t('support.privacy & terms')}
      </Link>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        {t('support.faq')}
      </Link>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        {t('support.contact us')}
      </Link>
      <Link
        to='/'
        className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'
      >
        {t('support.order tracking')}
      </Link>
      <div className='rounded-md px-3 py-2 hover:bg-[#dfdfdf] hover:font-semibold hover:text-textDark dark:hover:bg-[#101010] dark:hover:text-textLight'>
        <ChangeLanguage closePopover={closePopover} />
      </div>
    </div>
  )
}
