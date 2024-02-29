import { useContext } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import { adminProductGroupApi } from 'src/apis/admin.api'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { ProductGroup } from 'src/types/product.type'

export default function AdminProductGroupList() {
  const { setProductGroup, productGroup } = useContext(AdminContext)

  //? GET GROUP LIST
  const { data: itemsInGroupData } = useQuery({
    queryKey: ['admin_product_group_list'],
    queryFn: () => adminProductGroupApi.getProductGroups()
  })
  const groupList = itemsInGroupData?.data.data || []

  //? SELECT GROUP
  const handleChooseGroup = (group: ProductGroup) => () => {
    setProductGroup(group)
  }

  return (
    <div className='lg:py-4 relative rounded-lg border border-white/40 bg-darkBg p-4'>
      <div className='flex flex-col items-center justify-center'>
        <p className='lg:text-xl mb-2 text-lg font-semibold uppercase'>Chọn nhóm sản phẩm</p>
        <div className='mt-2 w-full rounded-lg border border-white/40 bg-darkColor900 p-2'>
          <div className='grid max-h-40 w-full grid-cols-4 gap-4 overflow-scroll  overscroll-contain '>
            {groupList?.map((group) => {
              const isActive = group.id === productGroup?.id
              return (
                <button
                  key={group.id}
                  className={classNames(
                    'col-span-1 flex items-center justify-center overflow-hidden rounded-xl border border-white/40 p-2 hover:border-white',
                    {
                      ' border-brownColor dark:border-haretaColor': isActive
                    }
                  )}
                  onClick={handleChooseGroup(group)}
                >
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
