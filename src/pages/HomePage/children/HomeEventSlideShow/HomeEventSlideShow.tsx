import React from 'react'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import { EventSlide } from '../../utils/types.util'
import HomeEventSlide from '../../components/HomeEventSlide'
import mainPath from 'src/constants/path'
import classNames from 'classnames'

const slides: EventSlide[] = [
  {
    urlImage: '',
    title: 'Trang hồ sơ',
    urlToPage: mainPath.home
  },
  {
    urlImage: '',
    title: 'Trang khóa học',
    urlToPage: mainPath.home
  },
  {
    urlImage: '',
    title: 'Trang thông báo',
    urlToPage: ''
  }
]

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

export default function HomeEventSlideShow() {
  console.log(slides)

  return (
    <Slide {...properties}>
      {slides.map((slide, index) => (
        <div key={index} className='h-[75vh] w-full'>
          <HomeEventSlide event={slide} />
        </div>
      ))}
    </Slide>
  )
}
