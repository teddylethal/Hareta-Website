import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changePasswordSchema, ChangePasswordSchema } from 'src/utils/rules'
import { Box } from '@mui/material'
import UserChangePassword from '../../components/UserChangePassword'

type FormData = ChangePasswordSchema
export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(changePasswordSchema) })

  const onSubmit = handleSubmit((data) => {})

  return (
    <div className='round-sm pl-10 shadow'>
      <div className='border-b border-b-gray-200 pb-5'>
        <h1 className='text-2xl'>Change Password</h1>
        <h1>General Information</h1>
      </div>

      <div className='pt-10'>
        <div>Change your password</div>
        <form className='flex flex-col items-center' onSubmit={onSubmit} noValidate>
          <Box className='w-1/2'>
            <UserChangePassword
              name='old_password'
              title='Old Password'
              register={register}
              errorMessage={errors.old_password?.message}
            />
            <UserChangePassword
              className='mt-3'
              name='new_password'
              title='New Password'
              register={register}
              errorMessage={errors.new_password?.message}
            />

            <UserChangePassword
              className='mt-3'
              name='confirm_new_password'
              title='Confirm New Password'
              register={register}
              errorMessage={errors.new_password?.message}
            />
            <button type='submit'>test</button>
          </Box>
        </form>
      </div>
    </div>
  )
}
