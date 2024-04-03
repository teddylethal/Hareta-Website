import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { adminOrderApi } from 'src/apis/admin.api'
import AdminOrderList from '../../components/AdminOrderList'
import AdminOrderDetail from '../../components/AdminOrderDetail'
import { AdminContext } from 'src/contexts/admin.context'

export default function AdminOrderMangement() {
  const { orderState } = useContext(AdminContext)

  //? get order list
  const enabled = orderState >= 0 || orderState <= 4
  const { data: orderListData } = useQuery({
    queryKey: ['admin_order_list', orderState],
    queryFn: () => {
      return adminOrderApi.getOrderList({ status: orderState, page: 1, limit: 10 })
    },

    staleTime: 3 * 60 * 1000,
    enabled: enabled
  })
  const orderList = orderListData?.data.data || []

  return (
    <div className='grid w-full grid-cols-2 gap-4'>
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
  )
}
