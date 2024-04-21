import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorRespone } from 'src/types/utils.type'
import { setProfileToLS } from 'src/utils/auth'
import { LoginSchema, loginSchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'
import AccountInput from 'src/components/AccountInput'
import omit from 'lodash/omit'
import InvalidLinkPopup from 'src/components/VerifyEmailDialog/InvalidLinkPopup'
import SuccessPasswordRecoveryPopup from 'src/components/VerifyEmailDialog/SuccessPasswordRecoveryPopup'
import SuccessEmailVerifyPopup from 'src/components/VerifyEmailDialog/SuccessEmailVerifyPopup'
import { useViewport } from 'src/hooks/useViewport'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import AnimateTransition from 'src/components/AnimateTransition'

type FormData = LoginSchema

export default function AuthLoginPage() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

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
  const getProfileMutation = useMutation({
    mutationFn: authApi.getProfile
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true)
        getProfileMutation.mutateAsync().then((response) => {
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

  //! TRANSLATION
  const { t } = useTranslation('login')

  return (
    <AnimateTransition isDialog={state}>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 tablet:grid-cols-6 tablet:px-6 tablet:py-24'>
          <div className='tablet:col-start-2 tablet:col-end-6 desktop:col-span-3 desktop:col-end-7'>
            <form
              className='rounded-xl bg-lightColor900 p-5 shadow-sm duration-200 dark:bg-darkColor900 tablet:p-10'
              onSubmit={onSubmit}
              noValidate
            >
              <div className='text-center text-2xl font-semibold uppercase text-haretaColor'>{t('login.login')}</div>

              <AccountInput
                name='email'
                register={register}
                type='text'
                className='mt-8 autofill:text-darkText autofill:dark:text-lightText'
                errorMessage={errors.email?.message}
                labelName={t('login.email')}
                required
                autoComplete='on'
                label={<FontAwesomeIcon icon={faEnvelope} className='h-4 w-4 text-haretaColor' />}
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
                label={<FontAwesomeIcon icon={faLock} className='h-4 w-4 text-haretaColor' />}
              />

              <div className='mt-2 text-base desktop:text-lg'>
                <Button
                  className='flex w-full items-center justify-center py-2 uppercase desktop:py-3'
                  type='submit'
                  isLoading={loginAccountMutation.isPending}
                  disabled={loginAccountMutation.isPending}
                >
                  {t('login.login')}
                </Button>
              </div>

              <div className='tablet:text-md mt-4 flex flex-col-reverse items-center justify-between text-xs tabletSmall:text-sm tablet:mt-12 tablet:flex-row'>
                <div className=''>
                  <Link to={path.AuthPasswordRecoveryRequestEmail} state={{ email: getValues('email') }}>
                    <p className=' text-blue-700 underline underline-offset-1 opacity-80 duration-200 hover:opacity-100 dark:text-blue-400'>
                      {t('login.Forgot Password?')}
                    </p>
                  </Link>
                </div>
                {!isSmall && (
                  <div className='flex items-center text-center'>
                    <span className='text-darkText/60 dark:text-lightText/60'>{t("login.Don't have an account?")}</span>
                    <Link className='ml-2 text-haretaColor/80 duration-200 hover:text-primaryColor' to={path.register}>
                      {t('login.sign up')}
                    </Link>
                  </div>
                )}

                {isSmall && (
                  <div className='mb-2 flex flex-col text-center'>
                    <span className='line-clamp-2 text-darkText/60 dark:text-lightText/60'>
                      {t("login.Don't have an account?")}
                    </span>
                    <Link className='ml-2 text-haretaColor/80 duration-200 hover:text-primaryColor' to={path.register}>
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