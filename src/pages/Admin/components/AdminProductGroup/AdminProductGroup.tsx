import { useQuery, useQueryClient } from '@tanstack/react-query'

import { useContext } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import classNames from 'classnames'
import productApi from 'src/apis/product.api'
import { ProductGroup, ProductListConfig } from 'src/types/product.type'
import { ColorRing } from 'react-loader-spinner'

export default function AdminProductGroup() {
  const { setProductGroup, productGroup, setCurrentProduct } = useContext(AdminContext)

  //! GET DEFAULT PRODUCTS
  const queryConfig = {}
  const { data: productGroupListData } = useQuery({
    queryKey: ['admin_default_product_list'],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    staleTime: 3 * 60 * 1000
  })
  const productGroupList = productGroupListData?.data.data

  //? SELECT GROUP
  const queryClient = useQueryClient()
  const handleChooseGroup = (group: ProductGroup) => () => {
    setCurrentProduct(null)
    setProductGroup(group)
    queryClient.invalidateQueries({ queryKey: ['items_in_group'] })
  }

  return (
    <div className='relative rounded-lg border border-white/40 bg-black p-4'>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <p className=' text-lg font-semibold uppercase desktop:text-xl'>Chọn nhóm sản phẩm</p>
        <div className='h-60 w-full overflow-scroll rounded-lg border border-white/40 bg-[#202020]'>
          {!productGroupList && (
            <div className='col-span-4 flex h-full items-center justify-center bg-black/50'>
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
          {productGroupList && (
            <div className='m-2 grid grid-cols-4 gap-4'>
              {productGroupList?.map((product) => {
                const isActive = product.group.id === productGroup?.id
                const avatarURL = product.avatar ? product.avatar.url : null
                return (
                  <div
                    key={product.id}
                    className={classNames('col-span-1 h-min rounded-xl p-1 outline outline-1 outline-offset-0', {
                      'outline-2 outline-haretaColor': isActive,
                      'outline-haretaColor/40 ': !isActive
                    })}
                  >
                    <button className='w-full space-y-2' onClick={handleChooseGroup(product.group)}>
                      <div className='relative w-full pt-[75%]'>
                        <img
                          src={avatarURL || ''}
                          alt={`${product.name} ${product.color}`}
                          className='absolute left-0 top-0 h-full w-full object-scale-down'
                        />
                      </div>
                      <div className='truncate'>{product.name}</div>
                    </button>
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
