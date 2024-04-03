import { useTranslation } from 'react-i18next'

interface Props {
  tag: number
  tailClassname?: string
  sectionClassname?: string
}

export default function ProductTag({
  tag,
  tailClassname = 'absolute left-16 top-0 h-0 w-0 border-[12px] border-y-tagColor border-l-tagColor border-r-transparent desktop:left-20 desktop:border-[12px]',
  sectionClassname = 'flex h-6 w-16 items-center justify-center bg-tagColor text-center text-xs text-lightText font-medium desktop:h-6 desktop:w-20 desktop:text-sm'
}: Props) {
  //! use translation
  const { t } = useTranslation('productdetail')

  return (
    <div className='relative'>
      <span className={sectionClassname}>
        {tag == 1 && t('tag.top seller')}
        {tag == 2 && t('tag.signature')}
        {tag == 3 && t('tag.favourite')}
      </span>
      <div className={tailClassname} />
    </div>
  )
}
