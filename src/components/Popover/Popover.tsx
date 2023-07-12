import {
  FloatingPortal,
  arrow,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ElementType, useId, useRef, useState } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
}

export default function Popover({ children, className, renderPopover, as: Element = 'div', initialOpen }: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, refs, strategy, middlewareData, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(14), shift(), arrow({ element: arrowRef })]
  })
  const hover = useHover(context, {
    handleClose: safePolygon({
      requireIntent: false
    })
  })

  const id = useId()
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              {...getFloatingProps()}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <div className='absolute -top-6 left-[calc(50%-40px)] z-20 h-10 w-20 self-center bg-transparent'></div>
              <span
                ref={arrowRef}
                className='absolute z-20 translate-y-[-90%] border-[12px] border-x-transparent border-b-[#F5F5F5] border-t-transparent'
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
