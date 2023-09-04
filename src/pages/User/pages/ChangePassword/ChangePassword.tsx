import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
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
  const { theme, setIsAuthenticated, setProfile } = useContext(AppContext)

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
    resolver: yupResolver(changePasswordSchema),
    shouldFocusError: false
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
            // console.log('here')
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

  const handleCancle = () => {
    reset()
  }

  return (
    <Fragment>
      <form className='my-4 px-2 md:my-6 md:px-4 lg:my-8 lg:px-6' onSubmit={onSubmit}>
        <div className='flex flex-col space-y-2 rounded-lg border border-black/20 bg-[#efefef] p-4 dark:border-white/20 dark:bg-[#202020]'>
          <div className='relative mt-2 w-full'>
            <p className='text-sm font-medium uppercase lg:text-lg'>Current password</p>
            <Input
              type='password'
              classNameInput='mt-2 w-full sm:w-[50%] px-4 py-2 bg-white rounded-md dark:bg-black text-xs lg:text-base outline-none duration-300 autofill:text-textDark dark:caret-white autofill:dark:text-textVintage '
              register={register}
              name='old_password'
              errorMessage={errors.old_password?.message}
            />
          </div>
          <div className='relative w-full '>
            <p className='text-sm font-medium uppercase lg:text-lg'>New password</p>
            <Input
              type='password'
              classNameInput='mt-2 w-full sm:w-[50%] px-4 py-2 bg-white rounded-md dark:bg-black text-xs lg:text-base outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage'
              register={register}
              name='new_password'
              errorMessage={errors.new_password?.message}
            />
          </div>
          <div className='relative w-full '>
            <p className='text-sm font-medium uppercase lg:text-lg'>Confirm new password</p>
            <Input
              type='password'
              classNameInput='mt-2 w-full sm:w-[50%] px-4 py-2 bg-white rounded-md dark:bg-black text-xs lg:text-base outline-none duration-300 autofill:text-textDark peer dark:caret-white autofill:dark:text-textVintage'
              register={register}
              name='confirm_new_password'
              errorMessage={errors.confirm_new_password?.message}
            />
          </div>
          <div className='flex w-full justify-start space-x-8 pt-2 text-sm sm:w-[50%] lg:text-base'>
            <button type='button' className='hover:underline' onClick={handleCancle}>
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-md bg-vintageColor/90 px-2 py-1  hover:bg-vintageColor dark:bg-haretaColor/90 dark:hover:bg-haretaColor/70 lg:px-4 lg:py-2 '
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
        closeButton={false}
      >
        <div className=' text-center'>
          <FontAwesomeIcon
            icon={faCheck}
            fontSize={36}
            className={classNames('text- rounded-full  p-4 text-center text-success ', {
              'bg-black/20': theme === 'light',
              'bg-white/20': theme === 'dark'
            })}
          />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>Password changed successfully!</p>
        <div className='mt-8 flex items-center justify-center'>
          <button
            onClick={handelConfirm}
            type='button'
            className={classNames(
              'inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium   ',
              {
                'bg-vintageColor/90 text-textDark hover:bg-vintageColor': theme === 'light',
                'bg-haretaColor/80 text-textLight hover:bg-haretaColor/60 ': theme === 'dark'
              }
            )}
          >
            Go to login
          </button>
        </div>
      </DialogPopup>
    </Fragment>
  )
}
