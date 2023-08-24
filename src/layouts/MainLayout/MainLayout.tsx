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
      <div className='pt-10 md:pt-12 lg:pt-16'>{children}</div>
      <Footer />
    </Fragment>
  )
}
