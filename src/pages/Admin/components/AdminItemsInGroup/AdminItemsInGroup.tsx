import { useContext, useEffect } from 'react'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { Product } from 'src/types/product.type'
import classNames from 'classnames'
import { ColorRing } from 'react-loader-spinner'

export default function AdminItemsInGroup() {
  const { itemGroup, currentItem, setCurrentItem } = useContext(CreatingItemContext)

  //? ITEMS IN GROUP
  const {
    data: itemsInGroupData,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['items_in_group'],
    queryFn: () =>
      productApi.getItemsInGroup({
        id: itemGroup?.id as string,
        page: '1',
        limit: '50'
      }),
    keepPreviousData: true,
    enabled: Boolean(itemGroup)
  })
  const itemsInGroup = itemsInGroupData?.data.data || []

  useEffect(() => {
    if (itemGroup) {
      refetch()
    }
  }, [itemGroup, refetch])

  //? CHOOSE ITEM
  const handleChooseVariant = (item: Product) => () => {
    setCurrentItem(item)
  }

  return (
    <div className='relative rounded-lg border border-white/40 bg-black p-4'>
      <div className='flex flex-col items-center justify-center'>
        <p className='mb-2 text-lg font-semibold uppercase lg:text-xl'>Choose variant</p>
        <div className='mt-2 w-full rounded-lg border border-white/40 bg-[#202020]'>
          <div className='grid h-60 w-full grid-cols-4 gap-4 overflow-scroll overscroll-contain p-2'>
            {isFetching && (
              <div className='col-span-4 flex h-full items-center justify-center'>
                <ColorRing
                  visible={true}
                  height='60'
                  width='60'
                  ariaLabel='blocks-loading'
                  wrapperStyle={{}}
                  wrapperClass='blocks-wrapper'
                  colors={['#ADD8E6', '#ADD8E6', '#ADD8E6', '#ADD8E6', '#ADD8E6']}
                />
              </div>
            )}
            {!isFetching &&
              itemsInGroup.map((item, index) => {
                const isActive = item.id === currentItem?.id
                const avatarURL = item.avatar ? item.avatar.url : null
                return (
                  <div
                    key={index}
                    className={classNames('col-span-1 h-min rounded-xl p-1 outline outline-1 outline-offset-0', {
                      'outline-2 outline-haretaColor': isActive,
                      'outline-haretaColor/40 ': !isActive
                    })}
                  >
                    <button className='w-full space-y-2' onClick={handleChooseVariant(item)}>
                      <div className='relative w-full pt-[75%]'>
                        <img
                          src={avatarURL || ''}
                          alt={`${item.name} ${item.color}`}
                          className='absolute left-0 top-0 h-full w-full object-scale-down'
                        />
                      </div>
                      <div className=''>{item.color}</div>
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
