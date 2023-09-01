import * as yup from 'yup'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { adminItemApi } from 'src/apis/admin.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { Fragment } from 'react'
import AdminUpdatingPage from '../AdminUpdatingPage'

interface FormData {
  id: string
}

const defaultItemSchema = yup.object({
  id: yup.string().required('Id is required')
})

export default function AdminSetDefaultItem() {
  //? SET DEFAULT ITEM
  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    register,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      id: ''
    },
    resolver: yupResolver(defaultItemSchema)
  })

  const setDefaultItemMutation = useMutation(adminItemApi.setDefaultItem)
  const onSubmit = handleSubmit(async (data) => {
    try {
      const newGroupRespone = await setDefaultItemMutation.mutateAsync({ ...data })
      reset()
      clearErrors()
    } catch (error) {
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          const responeLog = formError?.log as string
          if (responeLog.search(`'name'`) !== -1) {
            setError('id', {
              message: 'ID',
              type: 'Server'
            })
          }
        }
      }
    }
  })

  return (
    <Fragment>
      <AdminUpdatingPage />

      <div className='mt-4 rounded-lg border border-white/40 p-4'>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-lg font-semibold uppercase lg:text-lg'>Set default item</p>
          <form className='mt-2' onSubmit={onSubmit}>
            <Input
              classNameInput='text-textDark bg-white py-1 px-2 text-base lg:text-lg rounded-lg outline-none focus:outline-haretaColor'
              register={register}
              name='name'
              errorMessage={errors?.id?.message}
              autoComplete='false'
            />
            <div className='flex w-full items-center justify-end'>
              <button className='rounded-lg bg-haretaColor/80 px-4 py-1 text-base hover:bg-haretaColor/60 lg:text-lg'>
                Set default
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}
