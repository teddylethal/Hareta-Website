import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { adminOrderApi } from 'src/apis/admin.api'
import AdminOrderList from '../../components/AdminOrderList'
import classNames from 'classnames'
import AdminOrderDetail from '../../components/AdminOrderDetail'

export default function AdminOrder() {
  // const { orderState } = useContext(AdminContext)
  const [orderState, setOrderState] = useState<number>(-1)

  //? get order list
  const enabled = orderState != -1
  const { data: orderListData } = useQuery({
    queryKey: ['order_list_for_admin', orderState],
    queryFn: () => {
      return adminOrderApi.getOrderList({ status: orderState, page: 1, limit: 10 })
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
    enabled: enabled
  })
  const orderList = orderListData?.data.data || []

  //? handle choose state
  const handleChooseState = (state: number) => () => {
    setOrderState(state)
  }

  return (
    <div className='min-h-[600px]'>
      <div className='relative flex items-center justify-around rounded-xl border border-haretaColor py-2 text-base font-semibold text-textLight/80 lg:text-xl'>
        <button
          className={classNames('p-2', {
            'text-haretaColor': orderState == 0,
            ' text-textLight/80  hover:text-textLight': orderState != 0
          })}
          onClick={handleChooseState(0)}
        >
          Awaiting Payment
        </button>
        <button
          className={classNames('p-2', {
            'text-haretaColor': orderState == 1,
            ' text-textLight/80  hover:text-textLight': orderState != 1
          })}
          onClick={handleChooseState(1)}
        >
          Preparing Package
        </button>
        <button
          className={classNames('p-2', {
            'text-haretaColor': orderState == 2,
            ' text-textLight/80  hover:text-textLight': orderState != 2
          })}
          onClick={handleChooseState(2)}
        >
          Delivering
        </button>
        <button
          className={classNames('p-2', {
            'text-haretaColor': orderState == 3,
            ' text-textLight/80  hover:text-textLight': orderState != 3
          })}
          onClick={handleChooseState(3)}
        >
          Delivered
        </button>
        <button
          className={classNames('p-2', {
            'text-haretaColor': orderState == 4,
            ' text-textLight/80  hover:text-textLight': orderState != 4
          })}
          onClick={handleChooseState(4)}
        >
          Received
        </button>
      </div>

      <div className='mt-6 grid w-full grid-cols-2 gap-4'>
        <div className='col-span-1'>
          <div className='overflow-hidden rounded-xl border border-white/60 p-4'>
            <AdminOrderList orderList={orderList} />
          </div>
        </div>
        <div className='col-span-1'>
          <div className='sticky top-6 overflow-hidden rounded-xl border border-white/60 p-4'>
            <AdminOrderDetail />
          </div>
        </div>
      </div>
    </div>
  )
}
