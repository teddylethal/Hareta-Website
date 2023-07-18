import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from 'src/App'
import { loginAccount } from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import { AppContext } from 'src/contexts/app.context'
import { ErrorRespone } from 'src/types/utils.type'
import { LoginSchema, loginSchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'

type FormData = LoginSchema

export default function Login() {
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()
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
      onSuccess: () => {
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosBadRequestError<ErrorRespone<FormData>>(error)) {
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

  const { theme } = useContext(ThemeContext)

  return (
    <div
      className='mt-10 bg-cover bg-center duration-500 sm:mt-12 lg:mt-16'
      style={{
        backgroundImage: `url(${
          theme === 'dark'
            ? 'https://images.unsplash.com/photo-1526066843114-f1623fde3476?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
            : 'https://images.unsplash.com/photo-1470803233534-acd0cc85f275?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1148&q=80'
        })`
      }}
    >
      <div className='container'>
        <div className='grid grid-cols-1 py-12 md:grid-cols-6 md:px-6 md:py-24'>
          <div className='md:col-start-2 md:col-end-6 lg:col-span-3 lg:col-end-7'>
            <form
              className='rounded bg-[#F5F5F5] p-5 shadow-sm duration-500 dark:bg-[#222222] md:p-10'
              onSubmit={onSubmit}
              noValidate
            >
              <div className='text-center text-2xl uppercase text-vintageColor dark:text-haretaColor'>Login</div>

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
                autoComplete='on'
                svgData={
                  <>
                    <path d='M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z' />
                    <path d='M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z' />
                  </>
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
                isPasswordInput
                svgData={
                  <path
                    fillRule='evenodd'
                    d='M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z'
                    clipRule='evenodd'
                  />
                }
              />

              <div className='mt-3 text-base lg:text-lg'>
                <Button text='Sign in' className='py-3 uppercase lg:py-4' />
              </div>
              <div className='mt-8 flex justify-center text-center text-sm md:text-base'>
                <span className='text-gray-400'>Don&apos;t have an account?</span>
                <Link className='ml-2 text-haretaColor' to='/register'>
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
