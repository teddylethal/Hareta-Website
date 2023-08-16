import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changePasswordSchema, ChangePasswordSchema } from 'src/utils/rules'
import { Box } from '@mui/material'
import UserChangePassword from '../../components/UserChangePassword'
import { useMutation } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import { toast } from 'react-toastify'
import { omit } from 'lodash'
import ContentLayout from '../../layout/ContentLayout'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { clearLS } from 'src/utils/auth'

type FormData = ChangePasswordSchema
export default function ChangePassword() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(changePasswordSchema) })
  const changePasswordMutation = useMutation(userApi.changePassword)

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      const res = await changePasswordMutation.mutateAsync(data)
      console.log(res)
      toast.success(res.data.data)
      setIsAuthenticated(false)
      clearLS()
      reset()
    } catch (error) {
      console.log(error.response)
    }
  })

  return (
    <ContentLayout
      title='Change Password'
      subtitle='General Information'
      content={
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
                errorMessage={errors.confirm_new_password?.message}
              />
              <button type='submit'>test</button>
            </Box>
          </form>
        </div>
      }
    />
  )
}
