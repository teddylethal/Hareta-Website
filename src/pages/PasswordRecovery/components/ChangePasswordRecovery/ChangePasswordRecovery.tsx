import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Button from 'src/components/Button'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import path from 'src/constants/path'
import { ErrorRespone } from 'src/types/utils.type'
import { ChangePasswordRecoverySchema, changePasswordRecoverySchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'
import AccountInput from 'src/components/AccountInput'
import AnimateTransition from 'src/layouts/RegisterLayout/components/AnimateTransition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import verifyEmail from 'src/apis/verifyEmail.api'
import passwordRecovery from 'src/apis/passwordRecovery.api'

type FormData = ChangePasswordRecoverySchema

interface Props {
  setDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChangePasswordRecovery({ setDialog }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(changePasswordRecoverySchema)
  })

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const slug = searchParams.get('slug')
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['password_recovery'],
    queryFn: () => passwordRecovery.verifySlug(slug as string)
  })

  useEffect(() => {
    if (data) {
      // console.log(data.data.data.email)
      setValue('email', data.data.data.email as string)
    }
  }, [isSuccess])
  console.log(isLoading)

  const changePasswordRecoveryMutation = useMutation({
    mutationFn: (body: { slug: string; password: string }) => passwordRecovery.changePassword(body)
  })

  const onSubmit = handleSubmit((data) => {
    const submitData = {
      slug: searchParams.get('slug') as string,
      password: data.new_password
    }
    console.log(submitData)
    changePasswordRecoveryMutation.mutate(submitData, {
      onSuccess: (data) => {
        navigate(path.login, { state: { title: 'Password Recovery', context: 'Your password has been changed.' } })
      },
      onError: (error) => {
        console.log(error)
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
    <>
      {isLoading && <></>}
      {isSuccess && (
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
                      New password
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
                    disabled
                    autoComplete='on'
                    svgData={
                      <>
                        <path d='M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z' />
                        <path d='M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z' />
                      </>
                    }
                  />
                  <AccountInput
                    name='new_password'
                    register={register}
                    type='text'
                    className='mt-8 autofill:bg-red-400 autofill:text-textDark autofill:dark:text-textLight'
                    errorMessage={errors.new_password?.message}
                    labelName='New Password'
                    required
                    isPasswordInput
                    autoComplete='on'
                    svgData={
                      <path
                        fillRule='evenodd'
                        d='M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z'
                        clipRule='evenodd'
                      />
                    }
                  />
                  <AccountInput
                    name='confirm_new_password'
                    register={register}
                    type='text'
                    className='mt-8 autofill:bg-red-400 autofill:text-textDark autofill:dark:text-textLight'
                    errorMessage={errors.confirm_new_password?.message}
                    labelName='Confirm New Password'
                    required
                    isPasswordInput
                    autoComplete='on'
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
                      isLoading={changePasswordRecoveryMutation.isLoading}
                      disabled={changePasswordRecoveryMutation.isLoading}
                    >
                      Change
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </AnimateTransition>
      )}
    </>
  )
}
