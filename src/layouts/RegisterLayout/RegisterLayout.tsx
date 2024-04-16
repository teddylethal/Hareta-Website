import { useContext } from 'react'
import Footer from 'src/components/MainFooter'
import RegisterHeader from 'src/components/RegisterHeader'
import { AppContext } from 'src/contexts/app.context'
interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  const { theme } = useContext(AppContext)
  return (
    <div
      className='min-h-screen bg-cover bg-center duration-200 '
      style={{
        backgroundImage: `url(${
          theme === 'dark'
            ? 'https://images.unsplash.com/photo-1526066843114-f1623fde3476?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
            : 'https://images.unsplash.com/photo-1470803233534-acd0cc85f275?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1148&q=80'
        })`
      }}
    >
      <RegisterHeader />

      <div className='min-h-screen pt-10 tabletSmall:pt-12 desktop:pt-16'>{children}</div>
      <Footer />
    </div>
  )
}
