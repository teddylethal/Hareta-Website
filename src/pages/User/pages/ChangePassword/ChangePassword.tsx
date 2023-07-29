import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changePasswordSchema, ChangePasswordSchema } from 'src/utils/rules'
import { Box } from '@mui/material'

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
        <div>Thay đổi mật khẩu nếu nghi ngờ có người lạ truy cập</div>
        <form className='' onSubmit={onSubmit} noValidate>
          <Box className='flex'>
            <div>Old password:</div>
            <input type='oldPassword' className='' {...register('oldPassword')} />
            <div className='text-red-600'>{errors.oldPassword?.message}</div>
            {/* <Input name='oldPassword' register={register} type='text' labelName='oldPassword' visible={false} /> */}
          </Box>
          <Box className='flex'>
            <div>New Password:</div>
            <input type='newPassword' className='' {...register('newPassword')} />
            <div className='text-red-600'>{errors.newPassword?.message}</div>
            {/* <Input name='oldPassword' register={register} type='text' labelName='oldPassword' visible={false} /> */}
          </Box>
          <Box className='flex'>
            <div>Confirm New Password:</div>
            <input type='confirmNewPassword' className='' {...register('confirmNewPassword')} />
            <div className='text-red-600'>{errors.confirmNewPassword?.message}</div>
            {/* <Input name='oldPassword' register={register} type='text' labelName='oldPassword' visible={false} /> */}
          </Box>

          <button type='submit'>test</button>
        </form>
      </div>
    </div>
  )
}
