import { useContext } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import { adminProductGroupApi } from 'src/apis/admin.api'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { ProductGroup, ProductListConfig } from 'src/types/product.type'
import productApi from 'src/apis/product.api'

export default function AdminProductGroupList() {
  const { setProductGroup, productGroup } = useContext(AdminContext)

  //! GET PRODUTC GROUPS
  const { data: itemsInGroupData } = useQuery({
    queryKey: ['admin_product_group_list'],
    queryFn: () => adminProductGroupApi.getProductGroups(),
    staleTime: 1000 * 60 * 3
  })
  const groupList = itemsInGroupData?.data.data || []

  //! GET DEFAULT PRODUCTS
  const queryConfig = {}
  const { data: defaultProductsData } = useQuery({
    queryKey: ['admin_default_product_list'],
    queryFn: () => productApi.getProductList(queryConfig as ProductListConfig),
    staleTime: 1000 * 60 * 3
  })
  const defaultProducts = defaultProductsData?.data.data || []
  const notEmptyProductGroups = defaultProducts.map((product) => product.group.id)

  const emptyProductGroups = groupList.filter((group) => !notEmptyProductGroups.includes(group.id))

  //? SELECT GROUP
  const handleChooseGroup = (group: ProductGroup) => () => {
    setProductGroup(group)
  }

  return (
    <div className='relative rounded-lg border border-white/40 bg-darkBg p-4 desktop:py-4'>
      <div className='flex flex-col items-center justify-center'>
        <p className='mb-2 text-lg font-semibold uppercase desktop:text-xl'>Chọn nhóm sản phẩm</p>
        <div className='mt-2 w-full rounded-lg border border-white/40 bg-darkColor900 p-2'>
          <div className='grid h-80 w-full grid-cols-4 gap-4 overflow-auto'>
            {defaultProducts?.map((product) => {
              const isActive = product.group.id === productGroup?.id
              const avatarURL = product.avatar ? product.avatar.url : null
              return (
                <div
                  key={product.id}
                  className={classNames('border-1 border-offset-0 col-span-1 h-min rounded-xl border p-1', {
                    'border-haretaColor': isActive,
                    'border-haretaColor/40 ': !isActive
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

            {emptyProductGroups?.map((group) => {
              const isActive = group.id === productGroup?.id
              return (
                <button
                  key={group.id}
                  className={classNames('border-1 border-offset-0 col-span-1 min-h-full rounded-xl border p-1', {
                    'border-2 border-haretaColor': isActive,
                    'border-haretaColor/40 ': !isActive
                  })}
                  onClick={handleChooseGroup(group)}
                >
                  <div className='relative w-full pt-[75%]'>
                    <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center font-medium uppercase text-alertRed'>
                      0 sản phẩm
                    </div>
                  </div>
                  <div className=''>{group.name}</div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
