import {
  FloatingPortal,
  arrow,
  offset,
  shift,
  useFloating,
  useInteractions,
  type Placement,
  useClick,
  useDismiss
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
  handleClick?: () => void
  isOpen?: boolean
}

export default function FloatingOnClick({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement,
  isOpen,
  handleClick
}: Props) {
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, refs, strategy, middlewareData, context } = useFloating({
    open: isOpen,
    onOpenChange: handleClick,
    middleware: [offset(10), shift(), arrow({ element: arrowRef })],
    placement: placement || 'bottom'
  })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const { theme } = useContext(ThemeContext)

  const arrowClassName =
    'absolute z-20 translate-y-[-90%] border-[12px] border-x-transparent border-t-transparent ' +
    `${theme === 'dark' ? 'border-b-[#333]' : 'border-b-[#eee]'}`

  const id = useId()
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])
  return (
    <div>
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
                  className={arrowClassName}
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y
                  }}
                />
                <div className={theme === 'dark' ? 'dark' : 'light'}>{renderPopover}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </Element>
    </div>
  )
}
