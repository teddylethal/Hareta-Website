import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'

import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import { registerAccount } from 'src/apis/auth.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ResponeApi } from 'src/types/utils.type'

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ResponeApi<Omit<FormData, 'confirm_password'>>>(error)) {
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

  return (
    <div className='main-session--dark'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Register</div>

              <Input
                name='name'
                register={register}
                type='text'
                className='mt-8'
                errorMessage={errors.name?.message}
                placeholder='Enter your name'
              />

              <Input
                name='phone'
                register={register}
                type='text'
                className='mt-2'
                errorMessage={errors.phone?.message}
                placeholder='Enter your phone number'
              />

              <Input
                name='email'
                register={register}
                type='email'
                className='mt-4'
                errorMessage={errors.email?.message}
                placeholder='Enter email address'
              />

              <Input
                name='password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Enter password'
                autoComplete='on'
              />

              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-2'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm password'
                autoComplete='on'
              />

              <div className='mt-2'>
                <button className='text-l w-full bg-black px-2 py-4 text-center uppercase text-text_color hover:bg-gray-800 hover:text-hareta_color'>
                  Sign up
                </button>
              </div>
              <div className='mt-8 flex justify-center text-center'>
                <span className='text-gray-400'>Already have an account?</span>
                <Link className='ml-2 text-hareta_color' to='/login'>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
