import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

interface Props {
  children?: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <div className='bg-lightBg dark:bg-darkBg'>
      <Header />
      <div className='pt-10 md:pt-12 lg:pt-16'>{children}</div>
      <Footer />
    </div>
  )
}
