import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from 'src/App'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorRespone } from 'src/types/utils.type'
import { getAccessTokenFromLS, setProfileToLS } from 'src/utils/auth'
import { RequestVerifySchema, requestVerifySchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'
import AccountInput from 'src/components/AccountInput'
import { checkEmailVerified, setEmailVerified, unSetEmailVerified } from 'src/utils/store'
import SuccessEmailVerify from 'src/components/VerifyEmailDialog/SuccessEmailVerify'
import AnimateTransition from 'src/layouts/RegisterLayout/components/AnimateTransition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import FailEmailVerify from 'src/components/VerifyEmailDialog/FailEmailVerify'
import verifyEmail from 'src/apis/verifyEmail.api'

type FormData = RequestVerifySchema

export default function RequestVerifyEmail() {
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(requestVerifySchema)
  })

  const requestVerifyMutation = useMutation({
    mutationFn: (body: FormData) => verifyEmail.requestVerify(body)
  })

  const onSubmit = handleSubmit((data) => {
    requestVerifyMutation.mutate(data, {
      onSuccess: () => {},
      onError: (error) => {
        console.log(error)
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          const formError = error.response?.data
          const errorRespone = HttpStatusMessage.find(({ error_key }) => error_key === formError.error_key)
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

  const [dialog, setDialog] = useState(false)
  useEffect(() => {
    if (checkEmailVerified()) {
      setDialog(checkEmailVerified())
      unSetEmailVerified()
    }
  }, [])

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
                <Link to={path.login} className='absolute'>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    fontSize={40}
                    className='pr-4 text-vintageColor/80 hover:text-vintageColor dark:text-haretaColor'
                  />
                </Link>
                <div className='py-1 text-center text-2xl uppercase text-vintageColor dark:text-haretaColor'>
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
                  // isLoading={loginAccountMutation.isLoading}
                  // disabled={loginAccountMutation.isLoading}
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