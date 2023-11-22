import { useTranslation } from 'react-i18next'

export default function ChangeToThePrivacyPolicy() {
  //? translation
  const { t } = useTranslation('privacyAndTerms')
  return (
    <div>
      <div className='text-lg font-bold uppercase md:text-2xl xl:text-3xl'>{t('ChangeToThePrivacyPolicy.title')}</div>
      <div className='mt-2 flex flex-col space-y-2 text-sm sm:text-base md:text-lg xl:text-xl'>
        <p className=''>{t('ChangeToThePrivacyPolicy.content')}</p>
      </div>
    </div>
  )
}
