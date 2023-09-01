import { useContext } from 'react'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'
import { adminItemGroupApi } from 'src/apis/admin.api'
import { useQuery } from '@tanstack/react-query'
import { ItemGroup } from 'src/types/admin.type'
import classNames from 'classnames'

export default function AdminGroupNameList() {
  const { setItemGroup, itemGroup } = useContext(CreatingItemContext)

  //? GET GROUP LIST
  const { data: itemsInGroupData } = useQuery({
    queryKey: ['group_name_list'],
    queryFn: () => adminItemGroupApi.getItemGroups(),
    keepPreviousData: true
  })
  const groupList = itemsInGroupData?.data.data || []

  //? SELECT GROUP
  const handleChooseGroup = (group: ItemGroup) => () => {
    setItemGroup(group)
  }

  return (
    <div className='relative rounded-lg border border-white/40 bg-black p-4 lg:py-4'>
      <div className='flex flex-col items-center justify-center'>
        <p className='mb-2 text-lg font-semibold uppercase lg:text-xl'>Choose Item Group</p>
        <div className='mt-2 w-full rounded-lg border border-white/40 p-2'>
          <div className='grid max-h-40 w-full grid-cols-4 gap-4 overflow-scroll  overscroll-contain '>
            {groupList?.map((group) => {
              const isActive = group.id === itemGroup?.id
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
