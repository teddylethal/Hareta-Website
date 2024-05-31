import 'react-slideshow-image/dist/styles.css'
import HomeEventSlide from '../../components/HomeEventSlide'
import mainPath from 'src/constants/path'
import CustomSlideShow from 'src/components/CustomSlideShow'
import { EventSimple } from 'src/types/event.type'

const responsiveSettings = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  },
  {
    breakpoint: 464,
    settings: {
      slidesToShow: 1,
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

const tempEvents: EventSimple[] = [
  {
    id: '100',
    created_at: '0',
    updated_at: '0',
    status: 0,
    overall_content: 'Summer Keycap Sale with up to 50% off on all our unique and stylish keycaps!',
    discount: 50,
    avatar: 'https://d2csq352pki9k7.cloudfront.net/image/454931600.png'
  }
]

export default function HomeEventSlideShow() {
  return (
    <CustomSlideShow responsive={responsiveSettings} duration={5000}>
      {tempEvents.map((event) => (
        <div key={event.id} className='h-[75vh]'>
          <HomeEventSlide event={event} />
        </div>
      ))}
    </CustomSlideShow>
  )
}
