import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import { registerSchema, RegisterSchema } from 'src/utils/rules'
import authApi from 'src/apis/auth.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone } from 'src/types/utils.type'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import AccountInput from 'src/components/AccountInput'
import AnimateTransition from 'src/layouts/RegisterLayout/components/AnimateTransition'
import { useTranslation } from 'react-i18next'

type FormData = RegisterSchema

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        navigate(path.requestVerify, { state: { ...pick(data, ['email']), error: '', from: path.register } })
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          const formError = error.response?.data
          if (formError?.message) {
            setError('email', {
              message: formError.message,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  //? translation
  const { t } = useTranslation('login')

  return (
    <AnimateTransition>
      <div className='container'>
        <div className='md:grid-cols-6 md:px-6 md:py-24 grid grid-cols-1 py-12'>
          <div className='md:col-start-2 md:col-end-6 lg:col-span-4 lg:col-end-7'>
            <form
              className='md:p-10 rounded-xl bg-[#F5F5F5] p-5 shadow-sm duration-200 dark:bg-darkBg'
              onSubmit={onSubmit}
              noValidate
            >
              <div className='text-center text-2xl font-semibold uppercase text-haretaColor'>
                {t('register.register')}
              </div>

              <div className='xl:grid xl:grid-cols-2 xl:divide-x xl:divide-gray-300 dark:xl:divide-stone-700 py-8'>
                <div className='xl:mr-8'>
                  <AccountInput
                    name='email'
                    register={register}
                    type='text'
                    className='mt-4'
                    errorMessage={errors.email?.message}
                    labelName={t('register.Email address')}
                    required
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
                    autoComplete='on'
                    labelName={t('register.Password')}
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

                  <AccountInput
                    name='confirm_password'
                    register={register}
                    type='password'
                    className='mt-3'
                    errorMessage={errors.confirm_password?.message}
                    autoComplete='on'
                    labelName={t('register.Confirm password')}
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
                </div>

                <div className='xl:mt-0 xl:pl-8 mt-8'>
                  <AccountInput
                    name='name'
                    register={register}
                    type='text'
                    className='mt-4'
                    errorMessage={errors.name?.message}
                    labelName={t('register.Name')}
                    required
                    svgData={
                      <path
                        fillRule='evenodd'
                        d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                        clipRule='evenodd'
                      />
                    }
                  />

                  <AccountInput
                    name='phone'
                    register={register}
                    type='text'
                    className='mt-3'
                    errorMessage={errors.phone?.message}
                    labelName={t('register.Phone number')}
                    required
                    svgData={
                      <path
                        fillRule='evenodd'
                        d='M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z'
                        clipRule='evenodd'
                      />
                    }
                  />
                </div>
              </div>

              <div className='xl:text-lg mt-2 text-base'>
                <Button
                  className='lg:py-3 flex w-full items-center justify-center py-2 uppercase'
                  type='submit'
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  {t('login.sign up')}
                </Button>
              </div>
              <div className='md:text-base mt-8 flex justify-center  text-center text-sm'>
                <span className='text-darkText/60 dark:text-lightText/60'>
                  {t('register.Already have an account?')}
                </span>
                <Link className='ml-2 text-haretaColor/80 duration-200 hover:text-primaryColor' to={path.login}>
                  {t('login.login')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AnimateTransition>
  )
}
