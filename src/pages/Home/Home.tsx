import EventCarousel from './components/EventCarousel'
import NewReleaseCarousel from './components/NewReleaseCarousel'
import SignatureItemCarousel from './components/SignatureItemCarousel'

export default function Home() {
  return (
    <div className='space-y-8'>
      <EventCarousel />
      <NewReleaseCarousel />
      <SignatureItemCarousel />
    </div>
  )
}
