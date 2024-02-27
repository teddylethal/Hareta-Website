import * as yup from 'yup'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { adminItemApi } from 'src/apis/admin.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import { Fragment, useContext, useEffect } from 'react'
import AdminUpdatingPage from '../AdminUpdatingPage'
import { AdminContext } from '../../layouts/AdminMainLayout/AdminMainLayout'
import AdminProductGroup from '../../components/AdminProductGroup'
import AdminProductsInGroup from '../../components/AdminProductsInGroup'

interface FormData {
  id: string
}

const defaultItemSchema = yup.object({
  id: yup.string().required('Id is required')
})

export default function AdminSetDefaultItem() {
  const { currentItem } = useContext(AdminContext)

  //? SET DEFAULT ITEM
  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    register,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      id: ''
    },
    resolver: yupResolver(defaultItemSchema)
  })

  useEffect(() => {
    if (currentItem) {
      setValue('id', currentItem?.id)
    }
  }, [currentItem, setValue])

  const queryClient = useQueryClient()
  const setDefaultItemMutation = useMutation(adminItemApi.setDefaultItem)
  const onSubmit = handleSubmit(async (data) => {
    try {
      await setDefaultItemMutation.mutateAsync({ ...data })
      reset()
      clearErrors()
      queryClient.invalidateQueries({ queryKey: ['items_in_group'] })
      queryClient.invalidateQueries({ queryKey: ['adminDefaultProductList'] })
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

      <div className='mt-4 grid grid-cols-12 gap-6'>
        <div className='col-span-5'>
          <div className='sticky top-6 flex flex-col items-center justify-center overflow-hidden rounded-lg border border-white/40 p-4'>
            <p className='lg:text-lg text-lg font-semibold uppercase'>Set default item</p>
            <form className='mt-4' onSubmit={onSubmit}>
              <Input
                classNameInput='text-textDark bg-white py-1 px-2 text-base lg:text-lg rounded-lg outline-none focus:outline-haretaColor'
                register={register}
                name='id'
                errorMessage={errors?.id?.message}
                autoComplete='false'
              />
              <div className='flex w-full items-center justify-end'>
                <button className='lg:text-lg rounded-lg bg-haretaColor/80 px-4 py-1 text-base hover:bg-haretaColor/60'>
                  Set default
                </button>
              </div>
            </form>
            {!currentItem && <div className='absolute inset-0 z-10 bg-black/50'></div>}
          </div>
        </div>
        <div className='col-span-7 space-y-4'>
          <AdminProductGroup />
          <AdminProductsInGroup />
        </div>
      </div>
    </Fragment>
  )
}
