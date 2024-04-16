import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { Slide, SlideProps } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'

//! Styles
const arrowWrapperStyle = 'rounded-full p-4 bg-black opacity-70 duration-200 hover:opacity-100'
const arrowStyle = 'h-4 w-4 tablet:h-5 tablet:w-5 desktop:h-6 desktop:w-6 text-white'

const properties = {
  prevArrow: (
    <button className={classNames('ml-4', arrowWrapperStyle)}>
      <FontAwesomeIcon className={arrowStyle} icon={faChevronLeft} />
    </button>
  ),
  nextArrow: (
    <button className={classNames('mr-4', arrowWrapperStyle)}>
      <FontAwesomeIcon className={arrowStyle} icon={faChevronRight} />
    </button>
  )
}

export default function CustomSlideShow(props: SlideProps) {
  const { children, ...rest } = props
  return (
    <Slide {...properties} {...rest}>
      {children}
    </Slide>
  )
}
