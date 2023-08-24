import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorRespone } from 'src/types/utils.type'
import { getAccessTokenFromLS, setProfileToLS } from 'src/utils/auth'
import { LoginSchema, loginSchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'
import AccountInput from 'src/components/AccountInput'
import AnimateTransition from 'src/layouts/RegisterLayout/components/AnimateTransition'
import { omit } from 'lodash'
import SuccessPopup from 'src/components/VerifyEmailDialog/SuccessPopup'
import FailPopup from 'src/components/VerifyEmailDialog/FailPopup'

type FormData = LoginSchema

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true)
        const token = getAccessTokenFromLS()
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
        axios.get('https://api.hareta.me/auth/', { headers }).then((response) => {
          setProfileToLS(response.data.data)
          setProfile(response.data.data)
        })
        navigate(-1)
      },
      onError: (error) => {
        // console.log(error)
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          const formError = error.response?.data
          if (formError) {
            if (formError.error_key == 'ErrEmailNotVerified') {
              navigate(path.requestVerify, {
                state: { ...omit(data, ['password']), error: 'Please verify your email', from: path.login }
              })
            }

            const errorRespone = HttpStatusMessage.find(({ error_key }) => error_key === formError.error_key)
            if (errorRespone) {
              setError('email', {
                message: errorRespone.error_message,
                type: 'Server'
              })
              setError('password', {
                message: ' ',
                type: 'Server'
              })
            }
          }
        }
      }
    })
  })

  const [dialog, setDialog] = useState(false)
  const { state } = useLocation()
  console.log(state)
  useEffect(() => {
    if (state) {
      setDialog(true)
    }
  }, [])

  // console.log(watch)
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
              <div className='text-center text-2xl uppercase text-vintageColor dark:text-haretaColor'>Login</div>

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

              <AccountInput
                name='password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.password?.message}
                labelName='Password'
                required
                isPasswordInput
                svgData={
                  <path
                    fillRule='evenodd'
                    d='M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z'
                    clipRule='evenodd'
                  />
                }
              />

              <div className='mt-2 text-base lg:text-lg'>
                <Button
                  className='flex w-full items-center justify-center py-2 uppercase lg:py-3'
                  type='submit'
                  isLoading={loginAccountMutation.isLoading}
                  disabled={loginAccountMutation.isLoading}
                >
                  Login
                </Button>
              </div>

              <div className='flex justify-between'>
                <div className='mt-8 flex justify-center text-center md:text-base'>
                  <Link to={path.requestPasswordRecovery} state={{ email: getValues('email') }}>
                    <p className='text-sm text-blue-700 underline underline-offset-1 dark:text-blue-400'>
                      Forgot Password?
                    </p>
                  </Link>
                </div>
                <div className='mt-8 flex justify-center text-center text-sm md:text-base'>
                  <span className='text-gray-400'>Don&apos;t have an account?</span>
                  <Link className='ml-2 text-haretaColor' to={path.register}>
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {state &&
        (state?.type == 'Success' ? (
          <SuccessPopup
            dialog={dialog}
            closeDialog={() => {
              setDialog(false)
            }}
            title={state?.title}
            context={state?.context}
            guide='Please login to continue'
          />
        ) : (
          <FailPopup
            dialog={dialog}
            closeDialog={() => {
              setDialog(false)
            }}
            title={state?.title}
            context={state?.context}
            guide='Please login to continue'
          />
        ))}
    </AnimateTransition>
  )
}
