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

export default function ProductDescription({ item }: Props) {
  const { theme } = useContext(AppContext)

  const detailRef = useRef<HTMLDivElement>(null)

  //? HANDLE CLICK FIELD
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

  //? HANDLE DESCRIPTION
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

  //? translation
  const { t } = useTranslation('productdetail')

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      <div className='text-darkText dark:text-lightText ' ref={detailRef}>
        <div className='space-y-4'>
          <p className='lg:text-2xl xl:text-3xl text-xl font-semibold uppercase'>{t('detail.Detail')}</p>
          <div className='grid w-full grid-cols-3 gap-4'>
            <div className='lg:text-lg xl:text-xl col-span-1 text-base text-black/60 dark:text-white/60'>
              {t('detail.Category')}
            </div>
            <div className='col-span-2'>
              <button
                className='lg:text-lg xl:text-xl text-base capitalize hover:text-primaryColor dark:hover:text-primaryColor'
                onClick={handleChooseFilter('category', item.category)}
              >
                {item.category}
              </button>
            </div>
          </div>
          <div className='grid w-full grid-cols-3 gap-4'>
            <div className='lg:text-lg xl:text-xl col-span-1 text-base text-black/60 dark:text-white/60'>
              {t('detail.Collection')}
            </div>
            <div className='col-span-2'>
              <button
                className='lg:text-lg xl:text-xl text-base capitalize hover:text-primaryColor dark:hover:text-primaryColor'
                onClick={handleChooseFilter('collection', item.collection)}
              >
                {item.collection}
              </button>
            </div>
          </div>
          <div className='grid w-full grid-cols-3 gap-4'>
            <div className='lg:text-lg xl:text-xl col-span-1 text-base text-black/60 dark:text-white/60'>
              {t('detail.Type')}
            </div>
            <div className='col-span-2'>
              <button
                className='lg:text-lg xl:text-xl text-base capitalize hover:text-primaryColor dark:hover:text-primaryColor'
                onClick={handleChooseFilter('type', item.type)}
              >
                {item.type}
              </button>
            </div>
          </div>
          <div className='grid w-full grid-cols-3 gap-4'>
            <div className='lg:text-lg xl:text-xl col-span-1 text-base text-black/60 dark:text-white/60'>
              {t('detail.Product line')}
            </div>
            <div className='lg:text-lg xl:text-xl col-span-2 text-base capitalize'>{item.product_line}</div>
          </div>
          <div className='grid w-full grid-cols-3 gap-4'>
            <div className='lg:text-lg xl:text-xl col-span-1 text-base text-black/60 dark:text-white/60'>
              {t('detail.In store')}
            </div>
            <div className='lg:text-lg xl:text-xl col-span-2 text-base capitalize'>{item.quantity}</div>
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
                  __html: DOMPurify.sanitize(item.description)
                }}
                className='overflow-visible'
              />
              {extendButton && (
                <div className='absolute bottom-0 left-1/2 -translate-x-1/2'>
                  <button
                    className='lg:text-sm xl:text-base text-lightText flex items-center justify-center space-x-1 rounded-lg border border-black/20 bg-black/80 p-2 text-xs font-medium hover:text-haretaColor dark:border-white/20'
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
                    className='lg:text-sm xl:text-base text-lightText flex items-center justify-center space-x-1 rounded-lg border border-black/20 bg-black/60 p-2 text-xs font-medium hover:text-haretaColor dark:border-white/20'
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
