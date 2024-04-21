import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import { registerSchema, RegisterSchema } from 'src/utils/rules'
import authApi from 'src/apis/auth.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorRespone, InputField } from 'src/types/utils.type'
import Button from 'src/components/Button'
import path from 'src/constants/path'
import AccountInput from 'src/components/AccountInput'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import AnimateTransition from 'src/components/AnimateTransition'

type FormData = RegisterSchema

export default function AuthRegisterPage() {
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

  //! Multi languages
  const { t } = useTranslation('login')

  //! Form fields
  const accountFields: InputField[] = [
    {
      error: errors.email,
      errorMessage: errors.email?.message,
      name: 'email',
      title: t('register.Email address'),
      label: <FontAwesomeIcon icon={faEnvelope} className='h-4 w-4 text-haretaColor' />
    },
    {
      error: errors.password,
      errorMessage: errors.password?.message,
      name: 'password',
      title: t('register.Password'),
      isPassword: true,
      label: <FontAwesomeIcon icon={faLock} className='h-4 w-4 text-haretaColor' />
    },
    {
      error: errors.confirm_password,
      errorMessage: errors.confirm_password?.message,
      name: 'confirm_password',
      title: t('register.Confirm password'),
      isPassword: true,
      label: <FontAwesomeIcon icon={faLock} className='h-4 w-4 text-haretaColor' />
    }
  ]

  const informationFields: InputField[] = [
    {
      error: errors.name,
      errorMessage: errors.name?.message,
      name: 'name',
      title: 'Tên khóa học',
      label: <FontAwesomeIcon icon={faUser} className='h-4 w-4 text-haretaColor' />
    },
    {
      error: errors.phone,
      errorMessage: errors.phone?.message,
      name: 'phone',
      title: 'Tên khóa học',
      label: <FontAwesomeIcon icon={faPhone} className='h-4 w-4 text-haretaColor' />
    }
  ]

  return (
    <AnimateTransition>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 tablet:grid-cols-6 tablet:px-6 tablet:py-24'>
          <div className='tablet:col-start-2 tablet:col-end-6 desktop:col-span-4 desktop:col-end-7'>
            <form
              className='rounded-xl bg-[#F5F5F5] p-5 shadow-sm duration-200 dark:bg-darkBg tablet:p-10'
              onSubmit={onSubmit}
              noValidate
            >
              <div className='text-center text-2xl font-semibold uppercase text-haretaColor'>
                {t('register.register')}
              </div>

              <div className='py-8 desktopLarge:grid desktopLarge:grid-cols-2 desktopLarge:divide-x desktopLarge:divide-gray-300 dark:desktopLarge:divide-stone-700'>
                <div className='desktopLarge:mr-8'>
                  {accountFields.map((field) => (
                    <AccountInput
                      key={field.name}
                      name={field.name}
                      register={register}
                      type={field.isPassword ? 'password' : 'text'}
                      className='mt-4'
                      errorMessage={field.errorMessage}
                      labelName={field.title}
                      required
                      isPasswordInput={field.isPassword}
                      label={field.label}
                    />
                  ))}
                </div>

                <div className='mt-8 desktopLarge:mt-0 desktopLarge:pl-8'>
                  {informationFields.map((field) => (
                    <AccountInput
                      key={field.name}
                      name={field.name}
                      register={register}
                      type={'text'}
                      className='mt-4'
                      errorMessage={field.errorMessage}
                      labelName={field.title}
                      required
                      label={field.label}
                    />
                  ))}
                </div>
              </div>

              <div className='mt-2 text-base desktopLarge:text-lg'>
                <Button
                  className='flex w-full items-center justify-center py-2 uppercase desktop:py-3'
                  type='submit'
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  {t('login.sign up')}
                </Button>
              </div>
              <div className='mt-8 flex justify-center text-center  text-sm tablet:text-base'>
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