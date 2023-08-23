import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import Button from 'src/components/Button'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import path from 'src/constants/path'
import { ErrorRespone } from 'src/types/utils.type'
import { RequestVerifySchema, requestVerifySchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'
import AccountInput from 'src/components/AccountInput'
import AnimateTransition from 'src/layouts/RegisterLayout/components/AnimateTransition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import FailEmailVerify from 'src/components/VerifyEmailDialog/FailEmailVerify'
import verifyEmail from 'src/apis/verifyEmail.api'

type FormData = RequestVerifySchema

export default function RequestVerifyEmail() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    // clearErrors,
    // reset,
    // watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(requestVerifySchema)
  })

  const { state } = useLocation()

  const [dialog, setDialog] = useState(false)
  useEffect(() => {
    if (state) {
      if (state.title) {
        setDialog(true)
      } else {
        setValue('email', state.email)
        if (state.error != 'None') {
          setError('email', {
            message: 'Please verify your email.',
            type: 'Server'
          })
        }
      }
    }
  }, [setError, setValue, state])

  const requestVerifyMutation = useMutation({
    mutationFn: (body: FormData) => verifyEmail.requestVerify(body)
  })

  const onSubmit = handleSubmit((data) => {
    requestVerifyMutation.mutate(data, {
      onSuccess: () => {
        return
      },
      onError: (error) => {
        // console.log(error)
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          const formError = error.response?.data
          const errorRespone = HttpStatusMessage.find(({ error_key }) => error_key === formError?.error_key)
          if (errorRespone) {
            setError('email', {
              message: errorRespone.error_message,
              type: 'Server'
            })
          }
        }
      }
    })
  })
  // const email = watch('email')
  // useEffect(() => {
  //   console.log(123)
  //   reset('email':'test')
  // }, [email, clearErrors])

  return (
    <AnimateTransition>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 md:grid-cols-6 md:px-6 md:py-24'>
          <div className='md:col-start-2 md:col-end-6 lg:col-span-3 lg:col-end-7'>
            <form
              className='rounded bg-[#F5F5F5] p-5 shadow-sm duration-500 dark:bg-[#222222] md:p-10'
              onSubmit={onSubmit}
              noValidate
            >
              <div>
                <Link to={state?.from || path.login} className='absolute'>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    fontSize={32}
                    className='pr-4 text-vintageColor/80 hover:text-vintageColor dark:text-haretaColor'
                  />
                </Link>
                <div className='text-center text-2xl uppercase text-vintageColor dark:text-haretaColor'>
                  Email Verification
                </div>
              </div>

              <AccountInput
                name='email'
                register={register}
                type='text'
                className='mt-8 autofill:bg-red-400 autofill:text-textDark autofill:dark:text-textLight'
                errorMessage={errors.email?.message}
                labelName='Email'
                required
                autoComplete='on'
                svgData={
                  <>
                    <path d='M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z' />
                    <path d='M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z' />
                  </>
                }
              />

              <div className='mt-2 text-base lg:text-lg'>
                <Button
                  className='flex w-full items-center justify-center py-2 uppercase lg:py-3'
                  type='submit'
                  isLoading={requestVerifyMutation.isLoading}
                  disabled={requestVerifyMutation.isLoading}
                >
                  Verify Email Address
                </Button>
              </div>

              {/* <div className='mt-8 flex justify-center text-center text-sm md:text-base'>
                <span className='text-gray-400'>Don&apos;t have an account?</span>
                <Link className='ml-2 text-haretaColor' to={path.register}>
                  Sign up
                </Link>
              </div> */}
            </form>
          </div>
        </div>
      </div>

      <FailEmailVerify
        dialog={dialog}
        closeDialog={() => {
          setDialog(false)
        }}
      />
    </AnimateTransition>
  )
}
