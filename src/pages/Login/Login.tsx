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
import omit from 'lodash/omit'
import InvalidLinkPopup from 'src/components/VerifyEmailDialog/InvalidLinkPopup'
import SuccessPasswordRecoveryPopup from 'src/components/VerifyEmailDialog/SuccessPasswordRecoveryPopup'
import SuccessEmailVerifyPopup from 'src/components/VerifyEmailDialog/SuccessEmailVerifyPopup'
import { useViewport } from 'src/hooks/useViewport'
import { ApiURL } from 'src/utils/http'
import { useTranslation } from 'react-i18next'

type FormData = LoginSchema

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  //? responsive
  const viewPort = useViewport()
  const isSmall = viewPort.width <= 425
  const navigate = useNavigate()
  const { state } = useLocation()

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
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
        axios.get(`${ApiURL}auth/`, { headers }).then((response) => {
          setProfileToLS(response.data.data)
          setProfile(response.data.data)
        })
        if (state && state.context == 'AccessProtectedRouteDenied' && state.from == 'user') {
          navigate(path.profile)
        } else {
          navigate(-1)
        }
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          console.log(error)
          const formError = error.response?.data
          if (formError) {
            if (formError.error_key == 'ErrEmailNotVerified') {
              navigate(path.requestVerify, {
                state: { ...omit(data, ['password']), error: 'Please verify your email', from: path.login }
              })
            }

            const errorRespone = HttpStatusMessage.find(({ error_key }) => error_key === formError.error_key)
            if (errorRespone) {
              console.log(errorRespone.error_message)
              setError('email', {
                message: errorRespone.error_message,
                type: 'Server'
              })
              setError('password', {
                message: '',
                type: 'Server'
              })
            }
          }
        }
      }
    })
  })

  const [dialog, setDialog] = useState(true)
  const closeDialog = () => setDialog(false)
  useEffect(() => {
    if (state && (state.title == 'PasswordRecovery' || state.title == 'EmailVerification')) {
      setDialog(true)
      if (state?.email) {
        setValue('email', state?.email)
      }
    }
  }, [setValue, state])

  //? translation
  const { t } = useTranslation('login')

  return (
    <AnimateTransition isDialog={state}>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 md:grid-cols-6 md:px-6 md:py-24'>
          <div className='md:col-start-2 md:col-end-6 lg:col-span-3 lg:col-end-7'>
            <form
              className='rounded-xl bg-lightWhite900 p-5 shadow-sm duration-300 dark:bg-darkGray900 md:p-10'
              onSubmit={onSubmit}
              noValidate
            >
              <div className='text-center text-2xl font-semibold uppercase text-haretaColor'>{t('login.login')}</div>

              <AccountInput
                name='email'
                register={register}
                type='text'
                className='mt-8 autofill:text-textDark autofill:dark:text-textLight'
                errorMessage={errors.email?.message}
                labelName={t('login.email')}
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
                labelName={t('login.password')}
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
                  {t('login.login')}
                </Button>
              </div>

              <div className='md:text-md mt-4 flex flex-col-reverse items-center justify-between text-xs sm:text-sm md:mt-12 md:flex-row'>
                <div className=''>
                  <Link to={path.requestPasswordRecovery} state={{ email: getValues('email') }}>
                    <p className=' text-blue-700 underline underline-offset-1 opacity-80 duration-300 hover:opacity-100 dark:text-blue-400'>
                      {t('login.Forgot Password?')}
                    </p>
                  </Link>
                </div>
                {!isSmall && (
                  <div className='flex items-center text-center'>
                    <span className='text-textDark/60 dark:text-textLight/60'>{t("login.Don't have an account?")}</span>
                    <Link className='ml-2 text-haretaColor/80 duration-300 hover:text-primaryColor' to={path.register}>
                      {t('login.sign up')}
                    </Link>
                  </div>
                )}

                {isSmall && (
                  <div className='mb-2 flex flex-col text-center'>
                    <span className='line-clamp-2 text-textDark/60 dark:text-textLight/60'>
                      {t("login.Don't have an account?")}
                    </span>
                    <Link className='ml-2 text-haretaColor/80 duration-300 hover:text-primaryColor' to={path.register}>
                      {t('login.sign up')}
                    </Link>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      {state && state?.type == 'Success' && state?.title == 'PasswordRecovery' && (
        <SuccessPasswordRecoveryPopup dialog={dialog} closeDialog={closeDialog} />
      )}
      {state && state?.type == 'Success' && state?.title == 'EmailVerification' && (
        <SuccessEmailVerifyPopup dialog={dialog} closeDialog={closeDialog} />
      )}
      {state && state?.type == 'Fail' && <InvalidLinkPopup dialog={dialog} closeDialog={closeDialog} />}
    </AnimateTransition>
  )
}
