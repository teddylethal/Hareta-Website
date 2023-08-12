import CartHeader from 'src/components/CartHeader'
import Footer from 'src/components/Footer'

interface Props {
  children?: React.ReactNode
}

export default function CartLayout({ children }: Props) {
  return (
    <div>
      <CartHeader />
      <div className='mt-10 md:mt-12 lg:mt-16'>{children}</div>
      <Footer />
    </div>
  )
}
