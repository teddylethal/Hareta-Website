import { useViewport } from 'src/hooks/useViewport'
import { Fragment } from 'react'
import MobileFooter from './MobileFooter'
import DesktopFooter from './DesktopFooter'

export default function MainFooter() {
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768
  return (
    <Fragment>
      {!isMobile && <DesktopFooter />}
      {isMobile && <MobileFooter />}
    </Fragment>
  )
}
