import Footer from 'src/components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollDirection } from 'src/hooks/useScrollDirection'
import { useEffect, useState } from 'react'
import MainHeader from 'src/components/MainHeader'

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
    <div
      className='flex h-full min-h-full shrink-0 flex-col justify-between bg-lightBg text-darkText dark:bg-darkBg dark:text-lightText'
      style={{
        minHeight: 'inherit'
      }}
    >
      <div className='fixed z-10 w-full'>
        <AnimatePresence>
          {scrollDirection == 'up' && (
            <motion.div
              initial={{ y: firstY }}
              animate={{ y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
            >
              <MainHeader />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className='pt-10 tablet:pt-12 desktop:pt-16'>{children}</div>
      <Footer />
    </div>
  )
}
