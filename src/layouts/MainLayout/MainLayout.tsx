import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className='mt-10 md:mt-12 lg:mt-16'>{children}</div>
      <Footer />
    </div>
  )
}
