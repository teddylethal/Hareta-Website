import * as yup from 'yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { adminItemGroupApi } from 'src/apis/admin.api'
import Input from 'src/components/Input'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { useContext } from 'react'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'

interface FormData {
  name: string
}

const itemGroupSchema = yup.object({
  name: yup.string().required('Name is required')
})

export default function AdminItemGroup() {
  const { setItemGroup } = useContext(CreatingItemContext)

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

  return (
    <div className='relative rounded-lg border border-white/40 bg-black py-2 lg:py-4'>
      <div className='p-4'>
        <div className='flex flex-col items-center justify-center'>
          <p className='mb-2 text-lg font-semibold uppercase lg:text-xl'>Choose Item Group</p>
          <div className='max-h-40 overflow-scroll overscroll-contain rounded-lg border border-white/40 p-2'>
            <div className='flex flex-wrap gap-2'>
              {itemGroupList?.map((group) => (
                <div key={group.id} className=''>
                  <button
                    onClick={() => setItemGroup(group)}
                    className='rounded-lg border border-white/40 px-4 py-1 text-textLight/80 hover:border-white hover:text-textLight'
                  >
                    {group.name}
                  </button>
                </div>
              ))}
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
