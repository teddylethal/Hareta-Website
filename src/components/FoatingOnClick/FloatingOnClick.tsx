import {
  arrow,
  offset,
  shift,
  useFloating,
  useInteractions,
  type Placement,
  useDismiss,
  useHover,
  safePolygon,
  FloatingArrow
} from '@floating-ui/react'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { ElementType, useContext, useRef } from 'react'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  colorCode?: string
  placement?: Placement
  handleClick?: () => void
  openChange?: React.Dispatch<React.SetStateAction<boolean>>
  isOpen?: boolean
}

export default function FloatingOnClick({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  placement,
  isOpen,
  openChange
}: Props) {
  const { theme } = useContext(AppContext)

  const arrowRef = useRef(null)
  const { x, y, refs, middlewareData, context, strategy } = useFloating({
    open: isOpen,
    onOpenChange: openChange,
    middleware: [offset(10), shift(), arrow({ element: arrowRef })],
    placement: placement || 'bottom'
  })
  // const click = useClick(context)
  const dismiss = useDismiss(context)

  const hover = useHover(context, {
    handleClose: safePolygon({
      requireIntent: false,
      blockPointerEvents: true
    })
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss])
  return (
    <div>
      <Element ref={refs.setReference} {...getReferenceProps()} className={className}>
        {children}
      </Element>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: 'max-content',
              zIndex: 10,
              transformOrigin: `${middlewareData.arrow?.x}px top`
            }}
            {...getFloatingProps()}
            initial={{ opacity: 0, y: '-5%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-5%' }}
            transition={{ duration: 0.2 }}
          >
            {/* <div className='absolute -top-6 left-1/2 z-20 h-8 w-[20%] -translate-x-1/2 self-center bg-transparent' /> */}

            {/* <span
              ref={arrowRef}
              className={classNames(
                'absolute z-10 translate-y-[-90%] border-[12px] border-x-transparent border-t-transparent ',
                {
                  'border-b-[#202020]': theme === 'dark',
                  'border-b-[#efefef]': theme === 'light'
                }
              )}
              style={{
                left: middlewareData.arrow?.x,
                top: middlewareData.arrow?.y
              }}
            /> */}
            <div className={classNames('-translate-y-1')}>{renderPopover}</div>
            <FloatingArrow
              ref={arrowRef}
              context={context}
              width={30}
              height={10}
              className={classNames({ 'z-[5] fill-[#202020]': theme === 'dark', 'fill-[#efefef]': theme === 'light' })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
