import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Carousel from 'react-multi-carousel'
import { DotProps } from 'react-multi-carousel/lib/types'
import EventCarouselItem from '../EventCarouselItem'
import CustomDotsCarousel from '../CustomeDotsCarousel'
// import { useQuery } from '@tanstack/react-query'
// import productApi from 'src/apis/product.api'
// import useQueryConfig from 'src/hooks/useQueryConfig'
// import { ProductListConfig } from 'src/types/product.type'

export default function EventCarousel() {
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

  //? GET STORE DATA
  // const queryConfig = useQueryConfig()
  // const { data: storeData, isFetching } = useQuery({
  //   queryKey: ['items', queryConfig],
  //   queryFn: () => {
  //     return productApi.getProductList(queryConfig as ProductListConfig)
  //   },
  //   keepPreviousData: true,
  //   staleTime: 3 * 60 * 1000
  // })
  // const itemList = storeData?.data.data || []

  //? ARROW FIX FOR CAROUSEL
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ArrowFix = (arrowProps: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { carouselState, rtl, children, ...restArrowProps } = arrowProps
    return <span {...restArrowProps}>{children}</span>
  }

  //? CUSTOM DOT
  const CustomDots = ({ active, onClick }: DotProps) => {
    return (
      <button onClick={() => (onClick ? onClick() : {})}>
        <CustomDotsCarousel active={active} />
      </button>
    )
  }
  const eventList = Array(4).fill(0)

  return (
    <div className='bg-[#f8f8f8] dark:bg-[#282828]'>
      <Carousel
        showDots
        dotListClass='custom-dot-list-style'
        customDot={<CustomDots />}
        responsive={responsive}
        autoPlaySpeed={5000}
        infinite={true}
        autoPlay={true}
        transitionDuration={500}
        customLeftArrow={
          <ArrowFix>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className='text-primary-400 absolute left-4 top-1/2 h-6 w-auto -translate-y-1/2 cursor-pointer rounded-full p-4 text-textDark/60 duration-300 hover:h-7 hover:text-textDark dark:text-textLight/60 dark:hover:text-textLight xl:h-10 xl:hover:h-12'
            />
          </ArrowFix>
        }
        customRightArrow={
          <ArrowFix>
            <FontAwesomeIcon
              icon={faChevronRight}
              className='text-primary-400 absolute right-4 top-1/2 h-6 w-auto -translate-y-1/2 cursor-pointer rounded-full p-4 text-textDark/60 duration-300 hover:h-7 hover:text-textDark dark:text-textLight/60 dark:hover:text-textLight xl:h-10 xl:hover:h-12'
            />
          </ArrowFix>
        }
      >
        {eventList.map((_, index) => (
          <div className='' key={index}>
            <EventCarouselItem />
          </div>
        ))}
      </Carousel>
    </div>
  )
}
