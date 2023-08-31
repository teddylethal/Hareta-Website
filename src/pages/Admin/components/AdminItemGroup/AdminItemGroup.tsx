import * as yup from 'yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { adminItemGroupApi } from 'src/apis/admin.api'
import Input from 'src/components/Input'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { useContext } from 'react'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'
import classNames from 'classnames'
import productApi from 'src/apis/product.api'
import { ProductListConfig } from 'src/types/product.type'
import { ItemGroup } from 'src/types/admin.type'

interface FormData {
  name: string
}

const itemGroupSchema = yup.object({
  name: yup.string().required('Name is required')
})

export default function AdminItemGroup() {
  const { setItemGroup, itemGroup } = useContext(CreatingItemContext)

  //? GET ITEM LIST
  const queryConfig = {}
  const { data: itemGroupsData } = useQuery({
    queryKey: ['item_groups'],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const itemGroups = itemGroupsData?.data.data

  //? GET ITEM GROUPS
  const { data: itemGroupListData, refetch } = useQuery({
    queryKey: ['item_group_list'],
    queryFn: () => adminItemGroupApi.getItemGroups()
  })
  const itemGroupList = itemGroupListData?.data.data

  //? CREATE NEW GROUP
  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    register,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(itemGroupSchema)
  })

  const createGroupMutation = useMutation(adminItemGroupApi.createItemGroup)
  const onSubmit = handleSubmit(async (data) => {
    try {
      await createGroupMutation.mutateAsync({ ...data })
      refetch()
      reset()
      clearErrors()
    } catch (error) {
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          const responeLog = formError?.log as string
          if (responeLog.search(`'name'`) !== -1) {
            setError('name', {
              message: 'Name',
              type: 'Server'
            })
          }
        }
      }
    }
  })

  //? SELECT GROUP
  const queryClient = useQueryClient()
  const handleChooseGroup = (group: ItemGroup) => () => {
    setItemGroup(group)
    queryClient.invalidateQueries({ queryKey: ['items_in_group'] })
  }

  return (
    <div className='relative rounded-lg border border-white/40 bg-black py-2 lg:py-4'>
      <div className='p-4'>
        <div className='flex flex-col items-center justify-center'>
          <p className='mb-2 text-lg font-semibold uppercase lg:text-xl'>Choose Item Group</p>
          <div className='mt-2 w-full rounded-lg border border-white/40 p-2'>
            <div className='grid max-h-80 w-full grid-cols-4 gap-4 overflow-scroll  overscroll-contain '>
              {itemGroups?.map((item) => {
                const isActive = item.group.id === itemGroup?.id
                const avatarURL = item.avatar ? item.avatar.url : null
                return (
                  <div
                    key={item.id}
                    className={classNames('col-span-1 overflow-hidden rounded-xl p-1', {
                      'border border-brownColor dark:border-haretaColor': isActive
                    })}
                  >
                    <button className='space-y-2' onClick={handleChooseGroup(item.group)}>
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
      {/* <div className='p-4'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-lg font-semibold uppercase lg:text-lg'>Create new Item Group</p>
          <form className='mt-2' onSubmit={onSubmit}>
            <Input
              classNameInput='text-textDark bg-white py-1 px-2 text-base lg:text-lg rounded-lg outline-none focus:outline-haretaColor'
              register={register}
              name='name'
              errorMessage={errors?.name?.message}
              autoComplete='false'
            />
            <div className='flex w-full items-center justify-end'>
              <button className='rounded-lg bg-haretaColor/80 px-4 py-1 text-base hover:bg-haretaColor/60 lg:text-lg'>
                Create
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </div>
  )
}
