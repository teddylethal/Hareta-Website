import moment from 'moment'
import { Order } from 'src/types/order.type'

interface Props {
  order: Order
}

export default function OrderItem({ order }: Props) {
  //? format date
  const formatDate = (timeStamp: string) => {
    return moment(timeStamp).utc().format('YYYY-MM-DD')
  }

  return (
    <div className='grid grid-cols-4 gap-2 py-1 md:grid-cols-6 md:gap-4 md:py-2 xl:py-4'>
      <div className='col-span-2 md:col-span-4'>
        <div className='flex flex-col items-start space-y-2'>
          <p className='text-sm font-medium text-haretaColor md:text-base xl:text-lg'>{order.id}</p>
          <div className=''></div>
        </div>
      </div>
      <div className='col-span-1 min-h-full '>
        <p className='flex h-full flex-col items-center justify-center text-center text-xs font-medium sm:text-sm md:text-lg xl:text-xl'>
          {formatDate(order.created_at)}
        </p>
      </div>
      <div className='col-span-1'></div>
    </div>
  )
}
