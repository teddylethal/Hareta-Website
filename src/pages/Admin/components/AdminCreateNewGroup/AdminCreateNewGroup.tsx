import * as yup from 'yup'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { adminItemGroupApi } from 'src/apis/admin.api'
import { ItemGroup } from 'src/types/admin.type'
import { useContext } from 'react'
import { CreatingItemContext } from '../../layouts/AdminLayout/AdminLayout'

interface FormData {
  name: string
}

const itemGroupSchema = yup.object({
  name: yup.string().required('Name is required')
})

export default function AdminCreateNewGroup() {
  const { setItemGroup } = useContext(CreatingItemContext)

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
      const newGroupRespone = await createGroupMutation.mutateAsync({ ...data })
      const newGroup: ItemGroup = newGroupRespone.data.data
      setItemGroup(newGroup)
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

  return (
    <div className='rounded-lg border border-white/40 p-4'>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-lg font-semibold uppercase lg:text-lg'>new Item Group</p>
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
    </div>
  )
}
