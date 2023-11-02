import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Carousel from 'react-multi-carousel'
import { Product } from 'src/types/product.type'
import NewReleaseItem from '../NewReleaseItem'

interface Props {
  itemList: Product[]
}

const IsNewReleased = 86400 * 1000 * 30
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

export default function NewReleaseCarousel({ itemList }: Props) {
  const newRelaseList = itemList.filter((item) => date.getTime() - new Date(item.created_at).getTime() <= IsNewReleased)

  return (
    <div className='text-textDark duration-500 dark:text-textLight'>
      <div className='w-full text-center'>
        <p className='text-2xl font-bold uppercase lg:text-4xl xl:text-5xl'>new release</p>
      </div>
      <div className='mt-4 lg:mt-6 xl:mt-8'>
        <Carousel
          // showDots
          dotListClass='custom-dot-list-style'
          responsive={responsive}
          autoPlaySpeed={5000}
          infinite={true}
          autoPlay={true}
          transitionDuration={500}
          customLeftArrow={
            <ArrowFix>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className='text-primary-400 absolute left-1 top-1/2 h-3 w-3 -translate-y-1/2 cursor-pointer rounded-full bg-black/20 p-2 text-textDark/60 duration-300 hover:bg-black/40 hover:text-textDark dark:bg-white/20 dark:text-textLight/60 dark:hover:bg-white/40 dark:hover:text-textLight md:left-4 md:h-4 md:w-4 md:hover:h-5 md:hover:w-5 xl:h-8 xl:w-8 xl:hover:h-10 xl:hover:w-10'
              />
            </ArrowFix>
          }
          customRightArrow={
            <ArrowFix>
              <FontAwesomeIcon
                icon={faChevronRight}
                className='text-primary-400 absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 cursor-pointer rounded-full bg-black/20 p-2 text-textDark/60 duration-300 hover:bg-black/40 hover:text-textDark dark:bg-white/20 dark:text-textLight/60 dark:hover:bg-white/40 dark:hover:text-textLight md:right-4 md:h-4 md:w-4 md:hover:h-5 md:hover:w-5 xl:h-8 xl:w-8 xl:hover:h-10 xl:hover:w-10'
              />
            </ArrowFix>
          }
        >
          {newRelaseList.map((product) => (
            <div className='' key={product.id}>
              <NewReleaseItem product={product} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}
