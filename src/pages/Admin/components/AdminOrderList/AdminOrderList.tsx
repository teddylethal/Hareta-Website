import { useContext } from 'react'
import { Order } from 'src/types/order.type'
import { AdminContext } from 'src/contexts/admin.context'

interface Props {
  orderList: Order[]
}

export default function AdminOrderList({ orderList }: Props) {
  const { setOrderID } = useContext(AdminContext)

  return (
    <div>
      {orderList.length == 0 && <div className='h-80'></div>}
      {orderList.length > 0 &&
        orderList.map((order) => (
          <div
            className='mt-4 rounded-lg border border-white/40 px-2 py-4 first:mt-0 hover:bg-[#efefef] dark:hover:bg-[#101010]'
            key={order.id}
          >
            <button
              className='w-full text-left'
              onClick={() => {
                setOrderID(order.id)
              }}
            >
              <div className='flex w-full items-center space-x-1 font-semibold'>
                <p className=''>Order ID:</p>
                <p className='text-haretaColor'>{order.id}</p>
              </div>
              <div className='mt-4 flex w-full flex-col space-y-2'>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='col-span-1 uppercase'>Total:</div>
                  <div className='col-span-2 font-semibold'>${order.total}</div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='col-span-1 uppercase'>Customer name:</div>
                  <div className='col-span-2 font-semibold'>{order.name}</div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='col-span-1 uppercase'>email:</div>
                  <div className='col-span-2 font-semibold text-haretaColor'>{order.email}</div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='col-span-1 uppercase'>phone:</div>
                  <div className='col-span-2 font-semibold'>{order.phone}</div>
                </div>
                <div className='grid grid-cols-3 gap-2'>
                  <div className='col-span-1 uppercase'>address:</div>
                  <div className='col-span-2 font-semibold'>{order.address}</div>
                </div>
              </div>
            </button>
          </div>
        ))}
    </div>
  )
}
