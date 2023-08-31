import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { adminItemGroupApi } from 'src/apis/admin.api'
import Input from 'src/components/Input'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'

interface FormData {
  name: string
}

const itemGroupSchema = yup.object({
  name: yup.string().required('Name is required')
})

export default function AdminCreateItem() {
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
    <div>
      <div className='flex items-center justify-center rounded-xl border border-white/40 py-4'>
        <p className='text-lg font-medium uppercase text-textLight lg:text-3xl'>Create new item</p>
      </div>
      <div className='mt-12 space-y-8'>
        <div className='rounded-lg border border-white/40 p-4'>
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
        </div>
      </div>
    </div>
  )
}
