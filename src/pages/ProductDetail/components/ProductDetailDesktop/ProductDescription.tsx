import classNames from 'classnames'
import { createRef, useContext, useLayoutEffect, useRef, useState } from 'react'
import { Product } from 'src/types/product.type'
import DOMPurify from 'dompurify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import AnimateChangeInHeight from 'src/components/AnimateChangeInHeight'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { useTranslation } from 'react-i18next'

interface Props {
  item: Product
}

interface InfoItem {
  title: string
  info: string
  handleClick: () => void
}

export default function ProductDescription({ item }: Props) {
  const { theme } = useContext(AppContext)

  const detailRef = useRef<HTMLDivElement>(null)

  //! HANDLE CLICK FIELD
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const handleChooseFilter = (field: string, value: string) => () => {
    let searchParams = createSearchParams({
      ...queryConfig
    })
    if (field === 'category') {
      searchParams = createSearchParams(
        omit(
          {
            ...queryConfig,
            category: value
          },
          ['collection', 'type', 'page', 'limit']
        )
      )
    } else if (field === 'collection') {
      searchParams = createSearchParams(
        omit(
          {
            ...queryConfig,
            collection: value
          },
          ['category', 'type', 'page', 'limit']
        )
      )
    } else if (field === 'type') {
      searchParams = createSearchParams(
        omit(
          {
            ...queryConfig,
            type: value
          },
          ['category', 'collection', 'page', 'limit']
        )
      )
    }

    navigate({
      pathname: path.store,
      search: searchParams.toString()
    })
  }

  //! translation
  const { t } = useTranslation('productdetail')

  //! Get information
  const infos: InfoItem[] = [
    {
      title: t('detail.Category'),
      info: item.category,
      handleClick: handleChooseFilter('category', item.category)
    },
    {
      title: t('detail.Collection'),
      info: item.collection,
      handleClick: handleChooseFilter('collection', item.collection)
    },
    {
      title: t('detail.Type'),
      info: item.type,
      handleClick: handleChooseFilter('type', item.type)
    }
  ]

  //! HANDLE DESCRIPTION
  const [extendButton, setExtendButton] = useState(false)
  const itemDescriptionRef = createRef<HTMLDivElement>()
  const itemDescriptionContentRef = createRef<HTMLDivElement>()
  useLayoutEffect(() => {
    if (itemDescriptionRef.current && itemDescriptionContentRef.current) {
      if (itemDescriptionRef.current.clientHeight < itemDescriptionContentRef.current.scrollHeight) {
        setExtendButton(true)
      } else setExtendButton(false)
    }
  }, [itemDescriptionRef, itemDescriptionContentRef])

  const [extending, setExtending] = useState<boolean>(false)
  const extend = () => {
    setExtending(true)
  }
  const collapse = () => {
    if (detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    setExtending(false)
  }

  //! Style
  const wrapperClassname = 'grid w-full grid-cols-3 gap-4'
  const titleClassname =
    'col-span-1 text-base text-lightText/60 dark:text-lightText/60 desktop:text-lg desktopLarge:text-xl'
  const clickableInfoClassname =
    'text-base capitalize hover:text-primaryColor dark:hover:text-primaryColor desktop:text-lg desktopLarge:text-xl'
  const normalInfoClassname = 'col-span-2 text-base capitalize desktop:text-lg desktopLarge:text-xl'

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      <div
        className='rounded-lg bg-darkColor500 p-2 text-lightText dark:bg-darkColor700 dark:text-lightText'
        ref={detailRef}
      >
        <div className='space-y-4'>
          <p className='py-2 text-center text-xl font-semibold uppercase tracking-widest desktop:text-2xl desktopLarge:text-3xl'>
            {t('detail.Detail')}
          </p>
          {infos.map((infoItem, index) => (
            <div key={index} className={wrapperClassname}>
              <div className={titleClassname}>{infoItem.title}</div>
              <div className='col-span-2'>
                <button className={clickableInfoClassname} onClick={infoItem.handleClick}>
                  {infoItem.info}
                </button>
              </div>
            </div>
          ))}

          <div className={wrapperClassname}>
            <div className={titleClassname}>{t('detail.Product line')}</div>
            <div className={normalInfoClassname}>{item.product_line}</div>
          </div>

          <div className={wrapperClassname}>
            <div className={titleClassname}>{t('detail.In store')}</div>
            <div className={normalInfoClassname}>{item.quantity}</div>
          </div>
        </div>
        <div className='mt-10 '>
          <AnimateChangeInHeight>
            <div
              ref={itemDescriptionRef}
              className={classNames('relative py-1', {
                'max-h-80 overflow-hidden': !extending,
                'h-full overflow-visible': extending
              })}
            >
              <div
                ref={itemDescriptionContentRef}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(item.description, {
                    FORCE_BODY: true,
                    ALLOWED_ATTR: ['style', 'classs']
                  })
                }}
                style={{ color: '#fff' }}
                className='overflow-visible'
              />
              {extendButton && (
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2'>
                  <button
                    className='flex items-center justify-center space-x-1 rounded-lg border border-black/20 bg-black/80 p-2 text-xs font-medium text-lightText hover:text-haretaColor dark:border-white/20 desktop:text-sm desktopLarge:text-base'
                    onClick={extend}
                  >
                    <p>{t('detail.Extend')}</p>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                </div>
              )}
              {extending && (
                <div className='mt-4 flex w-full justify-center'>
                  <button
                    className='flex items-center justify-center space-x-1 rounded-lg border border-black/20 bg-black/60 p-2 text-xs font-medium text-lightText hover:text-haretaColor dark:border-white/20 desktop:text-sm desktopLarge:text-base'
                    onClick={collapse}
                  >
                    <p>{t('detail.Collapse')}</p>
                    <FontAwesomeIcon icon={faChevronUp} />
                  </button>
                </div>
              )}
            </div>
          </AnimateChangeInHeight>
        </div>
      </div>
    </div>
  )
}
