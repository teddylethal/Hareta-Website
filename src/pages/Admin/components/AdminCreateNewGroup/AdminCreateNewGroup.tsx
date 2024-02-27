import * as yup from 'yup'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { adminProductGroupApi } from 'src/apis/admin.api'
import { ProductGroup } from 'src/types/admin.type'
import { useContext } from 'react'
import { AdminContext } from 'src/contexts/admin.context'

interface FormData {
  name: string
}

const ProductGroupSchema = yup.object({
  name: yup.string().required('Name is required')
})

export default function AdminCreateNewGroup() {
  const { setProductGroup } = useContext(AdminContext)

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
    resolver: yupResolver(ProductGroupSchema)
  })

  const queryClient = useQueryClient()
  const createGroupMutation = useMutation(adminProductGroupApi.createProductGroup)
  const onSubmit = handleSubmit(async (data) => {
    try {
      const newGroupRespone = await createGroupMutation.mutateAsync({ ...data })
      const newGroup: ProductGroup = newGroupRespone.data.data
      setProductGroup(newGroup)
      reset()
      clearErrors()
      queryClient.invalidateQueries({ queryKey: ['group_name_list'] })
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
        <p className='lg:text-lg text-lg font-semibold uppercase'>Create Item Group</p>
        <form className='mt-2' onSubmit={onSubmit}>
          <Input
            classNameInput='text-textDark bg-white py-1 px-2 text-base lg:text-lg rounded-lg outline-none focus:outline-haretaColor'
            register={register}
            name='name'
            errorMessage={errors?.name?.message}
            autoComplete='false'
          />
          <div className='flex w-full items-center justify-end'>
            <button className='lg:text-lg rounded-lg bg-haretaColor/80 px-4 py-1 text-base hover:bg-haretaColor/60'>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
