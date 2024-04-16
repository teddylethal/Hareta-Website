import 'react-slideshow-image/dist/styles.css'
import { EventSlide } from '../../utils/types.util'
import HomeEventSlide from '../../components/HomeEventSlide'
import mainPath from 'src/constants/path'
import CustomSlideShow from 'src/components/CustomSlideShow'

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

const responsiveSettings = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 464,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 0,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }
]

export default function HomeEventSlideShow() {
  return (
    <CustomSlideShow responsive={responsiveSettings}>
      {slides.map((slide, index) => (
        <div key={index} className='h-[75vh]'>
          <HomeEventSlide event={slide} />
        </div>
      ))}
    </CustomSlideShow>
  )
}
