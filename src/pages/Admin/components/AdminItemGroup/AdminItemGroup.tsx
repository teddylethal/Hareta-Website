import { useQuery, useQueryClient } from '@tanstack/react-query'

import { useContext } from 'react'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'
import classNames from 'classnames'
import productApi from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'
import { ItemGroup } from 'src/types/admin.type'
import { ColorRing } from 'react-loader-spinner'

export default function AdminItemGroup() {
  const { setItemGroup, itemGroup, setCurrentItem } = useContext(CreatingItemContext)

  //? GET ITEM LIST
  const queryConfig = {}
  const { data: itemGroupsData, isFetching } = useQuery({
    queryKey: ['item_groups'],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const itemGroups = itemGroupsData?.data.data

  //? SELECT GROUP
  const queryClient = useQueryClient()
  const handleChooseGroup = (group: ItemGroup) => () => {
    setCurrentItem(null)
    setItemGroup(group)
    queryClient.invalidateQueries({ queryKey: ['items_in_group'] })
  }

  return (
    <div className='relative rounded-lg border border-white/40 bg-black py-2'>
      <div className='p-4'>
        <div className='flex flex-col items-center justify-center'>
          <p className='mb-2 text-lg font-semibold uppercase lg:text-xl'>Choose Item Group</p>
          <div className='mt-2 w-full rounded-lg border border-white/40 p-2'>
            <div className='grid max-h-80 w-full grid-cols-4 gap-4 overflow-scroll  overscroll-contain '>
              {isFetching && (
                <div className='col-span-4 flex h-60 items-center justify-center bg-black/50'>
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
                itemGroups?.map((item) => {
                  const isActive = item.group.id === itemGroup?.id
                  const avatarURL = item.avatar ? item.avatar.url : null
                  return (
                    <div
                      key={item.id}
                      className={classNames('col-span-1 overflow-hidden rounded-xl p-1', {
                        'border border-brownColor dark:border-haretaColor': isActive
                      })}
                    >
                      <button className='w-full space-y-2' onClick={handleChooseGroup(item.group)}>
                        <div className='relative w-full pt-[100%]'>
                          <img
                            src={avatarURL || ''}
                            alt={`${item.name} ${item.color}`}
                            className='absolute left-0 top-0 h-full w-full object-scale-down'
                          />
                        </div>
                        <div className=''>{item.name}</div>
                      </button>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
