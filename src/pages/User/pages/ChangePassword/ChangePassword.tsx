import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Fragment, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import DialogPopup from 'src/components/DialogPopup'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import { ErrorRespone } from 'src/types/utils.type'
import { clearLS } from 'src/utils/auth'
import { changePasswordSchema, ChangePasswordSchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'

type FormData = ChangePasswordSchema

export default function ChangePassword() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const [successDialog, setSuccessDialog] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_new_password: ''
    },
    resolver: yupResolver(changePasswordSchema)
  })

  const changePasswordMutation = useMutation(userApi.changePassword)
  const onSubmit = handleSubmit(async (data) => {
    try {
      await changePasswordMutation.mutateAsync(data, {
        onSuccess: () => {
          reset()
          setSuccessDialog(true)
        }
      })
    } catch (error) {
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          const errorKey = formError.error_key
          if (errorKey === 'ErrOldPasswordIsInvalid') {
            setError('old_password', {
              message: 'Your password is incorrect',
              type: 'Server'
            })
            console.log('here')
          }
          if (errorKey === 'ErrNewPasswordIsInvalid') {
            setError('confirm_new_password', {
              message: 'Passwords do not match',
              type: 'Server'
            })
          }
        }
      }
    }
  })

  const queryClient = useQueryClient()
  const handleLogout = () => {
    clearLS()
    setIsAuthenticated(false)
    setProfile(null)
    queryClient.removeQueries({
      queryKey: ['purchases']
    })
  }

  const handelConfirm = () => {
    setSuccessDialog(false)
    handleLogout()
  }

  return (
    <Fragment>
      <form className='my-8 px-6 font-medium  uppercase' onSubmit={onSubmit}>
        <div className='flex flex-col space-y-2 rounded-lg border border-black/20 bg-[#e8e8e8] p-4 dark:border-white/20 dark:bg-[#202020]'>
          <div className='relative mt-2'>
            <p>Current password</p>
            <Input
              type='password'
              classNameInput='mt-2 w-80 px-4 py-2 bg-white rounded-md dark:bg-black  text-base outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage'
              register={register}
              name='old_password'
              errorMessage={errors.old_password?.message}
            />
          </div>
          <div className='relative '>
            <p>New password</p>
            <Input
              type='password'
              classNameInput='mt-2 w-80 px-4 py-2 bg-white rounded-md dark:bg-black  text-base outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage'
              register={register}
              name='new_password'
              errorMessage={errors.new_password?.message}
            />
          </div>
          <div className='relative '>
            <p>Confirm new password</p>
            <Input
              type='password'
              classNameInput='mt-2 w-80 px-4 py-2 bg-white rounded-md dark:bg-black  text-base outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage'
              register={register}
              name='confirm_new_password'
              errorMessage={errors.confirm_new_password?.message}
            />
          </div>
          <div className='flex w-80 justify-center space-x-8'>
            <button type='button' className='hover:underline'>
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-md bg-vintageColor/80 px-4 py-2 hover:bg-vintageColor dark:bg-haretaColor/90 dark:hover:bg-haretaColor/70'
            >
              Change password
            </button>
          </div>
        </div>
      </form>
      <DialogPopup
        classNameWrapper='relative w-96 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
        isOpen={successDialog}
        handleClose={handelConfirm}
      >
        <p className='mt-6 text-center text-xl font-medium uppercase leading-6 text-green-500'>
          Changed password successfully
        </p>
        <div className='mt-4 text-left'>
          <p className='text-left'>Your password was changed</p>
          <p className='text-left'>You will be logged out. Plesase loggin again to continue using our service</p>
        </div>
        <div className='mt-8 flex justify-between'>
          <button
            onClick={handelConfirm}
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
          >
            Confirm
          </button>
        </div>
      </DialogPopup>
    </Fragment>
  )
}
