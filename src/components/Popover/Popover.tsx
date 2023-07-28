import {
  FloatingPortal,
  arrow,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions,
  type Placement,
  FloatingOverlay
} from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ElementType, useContext, useId, useRef, useState } from 'react'
import { ThemeContext } from 'src/App'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  colorCode?: string
  placement?: Placement
}

export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement
}: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, refs, strategy, middlewareData, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(14), shift(), arrow({ element: arrowRef })],
    placement: placement || 'bottom'
  })
  const hover = useHover(context, {
    handleClose: safePolygon({
      requireIntent: false,
      blockPointerEvents: true
    })
  })
  const { theme } = useContext(ThemeContext)
  // const color = 'border-b-' + `${colorCode ? `[${colorCode}]` : '[#F5F5F5]'}`
  const arrowClassName =
    'absolute -top-1 lg:top-0 z-10 translate-y-[-90%] border-[12px] border-x-transparent border-t-transparent ' +
    `${theme === 'dark' ? 'border-b-[#333]' : 'border-b-[#eee]'}`

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])
  return (
    <div>
      <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </Element>
      <AnimatePresence>
        {isOpen && (
          <FloatingOverlay lockScroll>
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                zIndex: 10,
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
                className={arrowClassName}
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              />
              <div className={theme === 'dark' ? 'dark' : 'light'}>{renderPopover}</div>
            </motion.div>
          </FloatingOverlay>
        )}
      </AnimatePresence>
    </div>
  )
}
