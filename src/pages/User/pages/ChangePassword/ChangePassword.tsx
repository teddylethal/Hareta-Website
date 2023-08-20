import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Input from 'src/components/Input'
import { changePasswordSchema, ChangePasswordSchema } from 'src/utils/rules'

type FormData = ChangePasswordSchema

export default function ChangePassword() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_new_password: ''
    },
    resolver: yupResolver(changePasswordSchema)
  })

  return (
    <form className='my-8 px-6 font-medium  uppercase'>
      <div className='flex flex-col space-y-2 rounded-lg border border-black/20 bg-[#e8e8e8] p-4 dark:border-white/20 dark:bg-[#202020]'>
        <div className='relative mt-2'>
          <p>Current password</p>
          <Input
            type='password'
            classNameInput='mt-2 w-80 px-4 py-2 bg-white rounded-md dark:bg-black  text-base outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage'
            register={register}
            name='old_password'
          />
        </div>
        <div className='relative '>
          <p>New password</p>
          <Input
            type='password'
            classNameInput='mt-2 w-80 px-4 py-2 bg-white rounded-md dark:bg-black  text-base outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage'
            register={register}
            name='new_password'
          />
        </div>
        <div className='relative '>
          <p>Confirm new password</p>
          <Input
            type='password'
            classNameInput='mt-2 w-80 px-4 py-2 bg-white rounded-md dark:bg-black  text-base outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage'
            register={register}
            name='confirm_new_password'
          />
        </div>
        <div className='flex w-80 justify-center space-x-8'>
          <button type='button' className='hover:underline'>
            Cancel
          </button>
          <button
            type='submit'
            className='rounded-md bg-vintageColor/80 px-4 py-2 hover:bg-vintageColor dark:bg-haretaColor/90 dark:hover:bg-haretaColor/70'
          >
            Change password
          </button>
        </div>
      </div>
    </form>
  )
}
