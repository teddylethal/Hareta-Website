import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Carousel, { DotProps } from 'react-multi-carousel'
import NewReleaseItem from '../NewReleaseItem'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { toArray } from 'lodash'

interface Props {
  setPageIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const IsNewReleased = 86400 * 1000 * 1
const date = new Date()
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

//? ARROW FIX FOR CAROUSEL
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ArrowFix = (arrowProps: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { carouselState, rtl, children, ...restArrowProps } = arrowProps
  return <span {...restArrowProps}>{children}</span>
}

export default function NewReleaseCarousel({ setPageIsLoading }: Props) {
  const [dragging, setDragging] = useState<boolean>(false)

  //? GET ITEMS
  const itemsConfig: QueryConfig = {}
  const { data: itemsData, isLoading } = useQuery({
    queryKey: ['new_release_items', itemsConfig],
    queryFn: () => {
      return productApi.getProductList(itemsConfig)
    }
  })
  const itemList = itemsData?.data.data || []

  const newRelaseList = itemList.filter((item) => date.getTime() - new Date(item.created_at).getTime() <= IsNewReleased)

  //? SET LOADING PAGE
  useEffect(() => setPageIsLoading(isLoading), [isLoading, setPageIsLoading])

  //? CUSTOM DOTS
  const dots = newRelaseList.map((item) => <div className='' key={item.id}></div>)
  const CustomDot = ({ index, onClick, active }: DotProps) => {
    return (
      <button
        onClick={(e) => {
          onClick && onClick()
          e.preventDefault()
        }}
        className='py-2'
      >
        <div
          className={classNames('mx-0.5 h-1 w-8 rounded-md  duration-500', {
            ' bg-haretaColor': active,
            ' bg-haretaColor/40': !active
          })}
        >
          {toArray(dots)[index as number]}
        </div>
      </button>
    )
  }

  return (
    <div className='container'>
      <div className='text-textDark duration-500 dark:text-textLight'>
        <div className='w-full text-center'>
          <p className='text-2xl font-bold uppercase text-haretaColor/80 dark:text-sunYellow lg:text-4xl xl:text-5xl'>
            new release
          </p>
        </div>
        <div className='relative mt-4 pb-8 lg:mt-6 xl:mt-8'>
          <Carousel
            showDots
            renderDotsOutside
            customDot={<CustomDot />}
            beforeChange={() => setDragging(true)}
            afterChange={() => setDragging(false)}
            responsive={responsive}
            swipeable={true}
            draggable={true}
            focusOnSelect
            autoPlaySpeed={5000}
            infinite={true}
            autoPlay={true}
            transitionDuration={500}
            customLeftArrow={
              <ArrowFix>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className='text-primary-400 absolute left-1 top-1/2 h-3 w-3 -translate-y-1/2 cursor-pointer rounded-full bg-black/10 p-2 text-textDark/60 duration-300 hover:bg-black/20 hover:text-textDark dark:bg-white/10 dark:text-textLight/60 dark:hover:bg-white/20 dark:hover:text-textLight md:left-4 md:h-4 md:w-4 md:hover:h-5 md:hover:w-5 xl:h-8 xl:w-8 xl:hover:h-10 xl:hover:w-10'
                />
              </ArrowFix>
            }
            customRightArrow={
              <ArrowFix>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className='text-primary-400 absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 cursor-pointer rounded-full bg-black/10 p-2 text-textDark/60 duration-300 hover:bg-black/20 hover:text-textDark dark:bg-white/10 dark:text-textLight/60 dark:hover:bg-white/20 dark:hover:text-textLight md:right-4 md:h-4 md:w-4 md:hover:h-5 md:hover:w-5 xl:h-8 xl:w-8 xl:hover:h-10 xl:hover:w-10'
                />
              </ArrowFix>
            }
          >
            {newRelaseList.map((product) => (
              <div className='' key={product.id}>
                <NewReleaseItem product={product} dragging={dragging} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}
