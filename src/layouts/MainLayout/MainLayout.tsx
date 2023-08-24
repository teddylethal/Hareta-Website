import { Fragment } from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <Fragment>
      <Header />
      <div className='relative h-full w-full pt-10 md:py-12 lg:py-16'>
        <div className='fixed h-full w-full overflow-auto'>
          {children}
          <Footer />
        </div>
      </div>
    </Fragment>
  )
}
