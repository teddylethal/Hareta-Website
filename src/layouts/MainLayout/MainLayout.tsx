import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollDirection } from 'src/hooks/useScrollDirection'
import { useEffect, useState } from 'react'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  const scrollDirection = useScrollDirection()

  const [firstY, setFirstY] = useState(0)

  useEffect(() => {
    setFirstY(-100)
  }, [])

  return (
    <div className='bg-lightBg dark:bg-darkBg'>
      <div className='fixed z-10 w-full'>
        <AnimatePresence>
          {scrollDirection == 'up' && (
            <motion.div
              initial={{ y: firstY }}
              animate={{ y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Header />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className='pt-10 md:pt-12 lg:pt-16'>{children}</div>
      <Footer />
    </div>
  )
}
