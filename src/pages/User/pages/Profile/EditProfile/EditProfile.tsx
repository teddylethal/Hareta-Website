import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { UserSchema } from 'src/utils/rules'

type FormData = Pick<UserSchema, 'name' | 'phone'>

export default function EditProfile() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<FormData>()

  return (
    <Fragment>
      <div className=''>
        <div className='flex items-center space-x-2'>
          <p className=' text-lg uppercase text-textDark/60 dark:text-textLight/60'>Name</p>
          <FontAwesomeIcon icon={faPen} fontSize={12} className='text-orangeColor dark:text-haretaColor' />
        </div>
        <div className='relative'>
          <Input
            classNameInput=' w-full py-1 bg-transparent  text-base outline-none duration-300 autofill:text-textDark  dark:caret-white autofill:dark:text-textVintage'
            register={register}
            name='name'
            errorMessage={errors?.name?.message}
          />
          <div className='absolute bottom-5 w-full border-b-2 border-black/60 dark:border-white/60'></div>
        </div>
      </div>
      <div className=''>
        <div className='flex items-center space-x-2'>
          <p className=' text-lg uppercase text-textDark/60 dark:text-textLight/60'>Phone number</p>
          <FontAwesomeIcon icon={faPen} fontSize={12} className='text-orangeColor dark:text-haretaColor' />
        </div>
        <div className='relative'>
          <Controller
            control={control}
            name='phone'
            render={({ field }) => (
              <InputNumber
                classNameInput=' w-full py-1 bg-transparent  text-base outline-none duration-300 autofill:text-textDark dark:caret-white autofill:dark:text-textVintage'
                errorMessage={errors.phone?.message}
                {...field}
                onChange={field.onChange}
              />
            )}
          />

          <div className='absolute bottom-5 w-full border-b-2 border-black/60 dark:border-white/60'></div>
        </div>
      </div>
    </Fragment>
  )
}
