import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { loginAccount } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import { ResponeApi } from 'src/types/utils.type'
import { LoginSchema, loginSchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'

type FormData = LoginSchema

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosBadRequestError<ResponeApi<FormData>>(error)) {
          const formError = error.response?.data
          if (formError) {
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

  return (
    <div className='bg-white dark:bg-dark_theme'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-center text-2xl'>Login</div>

              {/* <div className='mt-8'>
                <div className='group relative mx-0 my-8 h-12 w-full border-b-2 border-black'>
                  <span className='absolute right-2 top-1/2 -translate-y-1/2 text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='black'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-6 w-6 leading-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                      />
                    </svg>
                  </span>
                  <input
                    id='email-input'
                    type='email'
                    className='peer h-full w-full border-none bg-transparent pl-1.5 pr-[35px] text-lg outline-none'
                    required
                  />
                  <label
                    htmlFor='email-input'
                    className='absolute left-1.5 top-1/2 -translate-y-1/2 cursor-text  text-lg text-[#505050] duration-300  peer-valid:top-[-5px] peer-focus:top-[-5px]'
                  >
                    Email
                  </label>
                </div>
              </div> */}

              <Input
                name='email'
                register={register}
                type='text'
                className='mt-8'
                errorMessage={errors.email?.message}
                labelName='Email'
                required
                pathData={
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                  />
                }
              />

              <Input
                name='password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.password?.message}
                labelName='Password'
                required
                pathData={
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
                  />
                }
              />

              <div className='mt-3'>
                <button
                  type='submit'
                  className='text-l w-full rounded-md bg-black px-2 py-4 text-center uppercase text-text_color hover:bg-gray-800 hover:text-hareta_color'
                >
                  Sign in
                </button>
              </div>
              <div className='mt-8 flex justify-center text-center'>
                <span className='text-gray-400'>Don&apos;t have an account?</span>
                <Link className='ml-2 text-hareta_color' to='/register'>
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
