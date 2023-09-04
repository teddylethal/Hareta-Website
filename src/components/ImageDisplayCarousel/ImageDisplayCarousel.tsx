import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ColorRing } from 'react-loader-spinner'
import Carousel from 'react-multi-carousel'
import { ProductImage } from 'src/types/productImage.type'

interface Props {
  imageList: ProductImage[]
  isLoading?: boolean
}

export default function ImageDisplayCarousel({ imageList, isLoading }: Props) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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

  return (
    <Carousel
      responsive={responsive}
      autoPlaySpeed={1500}
      rewind={true}
      rewindWithAnimation
      autoPlay={true}
      transitionDuration={500}
      arrows={false}
      className='absolute left-0 top-0 h-full w-full object-cover'
    >
      {isLoading &&
        Array(4)
          .fill(0)
          .map((_, index) => (
            <div className='flex items-center justify-center' key={index}>
              <ColorRing
                visible={true}
                height='80'
                width='80'
                ariaLabel='blocks-loading'
                wrapperStyle={{}}
                wrapperClass='blocks-wrapper'
                colors={['#ccc', '#ccc', '#ccc', '#ccc', '#ccc']}
              />
            </div>
          ))}
      {!isLoading &&
        imageList.map((image) => {
          const imageURL = image.image ? image.image.url : null
          return (
            <div className='' key={image.id}>
              {imageURL ? (
                <img src={imageURL} alt={image.color} className='w-full object-cover' />
              ) : (
                <div className='flex items-center justify-center'>
                  <FontAwesomeIcon icon={faTriangleExclamation} fontSize={40} />
                </div>
              )}
            </div>
          )
        })}
    </Carousel>
  )
}
