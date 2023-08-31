import { useContext, useEffect } from 'react'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { ItemInGroupConfig, Product } from 'src/types/product.type'
import classNames from 'classnames'

export default function AdminItemsInGroup() {
  const { itemGroup, currentItem, setCurrentItem } = useContext(CreatingItemContext)

  //? ITEMS IN GROUP
  const itemInGroupQuery: ItemInGroupConfig = {
    id: itemGroup?.id as string,
    page: '1',
    limit: '50'
  }

  const { data: itemsInGroupData, refetch } = useQuery({
    queryKey: ['items_in_group'],
    queryFn: () => productApi.getItemsInGroup(itemInGroupQuery),
    keepPreviousData: true,
    enabled: Boolean(itemGroup)
  })
  const itemsInGroup = itemsInGroupData?.data.data || []

  useEffect(() => {
    refetch()
  }, [itemGroup, refetch])

  //? CHOOSE ITEM
  const handleChooseVariant = (item: Product) => () => {
    setCurrentItem(item)
  }

  return (
    <div className='relative rounded-lg border border-white/40 bg-black py-2 lg:py-4'>
      <div className='flex flex-col items-center justify-center p-4'>
        <p className='mb-2 text-lg font-semibold uppercase lg:text-xl'>Choose Item</p>
        <div className='mt-2 w-full rounded-lg border border-white/40 p-2'>
          <div className='grid max-h-60 w-full grid-cols-4 gap-4 overflow-scroll  overscroll-contain '>
            {itemsInGroup.map((item, index) => {
              const isActive = item.id === currentItem?.id
              const avatarURL = item.avatar ? item.avatar.url : null
              return (
                <div
                  key={index}
                  className={classNames('col-span-1 overflow-hidden rounded-xl p-1', {
                    'border border-brownColor dark:border-haretaColor': isActive
                  })}
                >
                  <button className='space-y-2' onClick={handleChooseVariant(item)}>
                    <div className='relative w-full pt-[100%]'>
                      <img
                        src={avatarURL || ''}
                        alt={`${item.name} ${item.color}`}
                        className='absolute left-0 top-0 h-full w-full object-scale-down'
                      />
                    </div>
                    <div className=''>
                      {item.name} {item.color}
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
