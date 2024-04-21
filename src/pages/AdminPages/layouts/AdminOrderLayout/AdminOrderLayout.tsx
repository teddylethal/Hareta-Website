import classNames from 'classnames'
import React, { useContext } from 'react'
import { AdminContext } from 'src/contexts/admin.context'

interface Props {
  children?: React.ReactNode
}

interface OrderState {
  name: string
  state: number
}

const menus: OrderState[] = [
  { name: 'Chờ thanh toán', state: 0 },
  { name: 'Đang chuẩn bị hàng', state: 1 },
  { name: 'Đang giao hàng', state: 2 },
  { name: 'Đã giao hàng', state: 3 },
  { name: 'Đã nhận hàng', state: 4 }
]

export default function AdminOrderLayout({ children }: Props) {
  const { orderState, setOrderState } = useContext(AdminContext)

  //! handle choose state
  const handleChooseState = (state: number) => () => {
    setOrderState(state)
  }

  return (
    <div className='relative grid grid-cols-12 gap-2'>
      <div className='col-span-2 p-4'>
        <div className='sticky flex flex-col items-center justify-around space-y-2 overflow-hidden rounded-md border border-white/40 p-3 text-base font-semibold text-lightText/80'>
          {menus.map((item, index) => (
            <button
              onClick={handleChooseState(item.state)}
              key={index}
              className={classNames('flex w-full items-center justify-start rounded-md px-4 py-1.5', {
                'bg-haretaColor text-darkText': orderState == item.state,
                'hover:bg-haretaColor hover:text-darkText': orderState != item.state
              })}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className='col-span-10'>
        <div className='p-4 text-lightText'>{children}</div>
      </div>
    </div>
  )
}
