import { useContext, useEffect } from 'react'
import { AdminContext } from '../../layouts/AdminMainLayout/AdminMainLayout'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import classNames from 'classnames'
import LoadingRing from 'src/components/LoadingRing'

interface Props {
  groupId: string
}

export default function AdminVariantList({ groupId }: Props) {
  //! GET PRODUCT IN GROUP
  const {
    data: itemsInGroupData,
    refetch,
    isFetching,
    isFetched
  } = useQuery({
    queryKey: ['admin_variant_list'],
    queryFn: () =>
      productApi.getItemsInGroup({
        id: groupId,
        page: '1',
        limit: '50'
      })
  })
  const itemsInGroup = itemsInGroupData?.data.data || []

  // useEffect(() => {
  //   if (ProductGroup) {
  //     refetch()
  //   }
  // }, [ProductGroup, refetch])

  return (
    <div className='relative rounded-lg border border-white/40 bg-black p-4'>
      <div className='flex w-full flex-col items-center justify-center space-y-4'>
        <p className='lg:text-xl text-lg font-semibold uppercase'>variant list</p>
        <div className='h-60 w-full overflow-scroll rounded-lg border border-white/40 bg-[#202020]'>
          {/* {!ProductGroup && (
            <div className='inset-0 flex h-full w-full cursor-not-allowed items-center justify-center text-2xl uppercase'>
              select a group
            </div>
          )} */}
          {isFetching && (
            <div className='inset-0 flex h-full w-full items-center justify-center bg-black/50'>
              <LoadingRing />
            </div>
          )}
          {isFetched && (
            <div className='m-2 grid grid-cols-4 gap-4'>
              {itemsInGroup.map((item, index) => {
                const avatarURL = item.avatar ? item.avatar.url : null
                return (
                  <div key={index} className={classNames('col-span-1 h-min rounded-xl p-1', {})}>
                    <div className='w-full space-y-2'>
                      <div className='relative w-full pt-[75%]'>
                        <img
                          src={avatarURL || ''}
                          alt={`${item.name} ${item.color}`}
                          className='absolute left-0 top-0 h-full w-full object-scale-down'
                        />
                      </div>
                      <p className='text-center'>{item.color}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
