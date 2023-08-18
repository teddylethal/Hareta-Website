import { faCheck, faPen, faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ThemeContext } from 'src/App'
import userApi from 'src/apis/user.api'
import DialogPopup from 'src/components/DialogPopup'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import { AppContext } from 'src/contexts/app.context'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import { setProfileToLS } from 'src/utils/auth'
import { UserSchema, userSchema } from 'src/utils/rules'

type FormData = Pick<UserSchema, 'name' | 'phone'>

const profileSchema = userSchema.pick(['name', 'phone'])

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const { theme } = useContext(ThemeContext)

  const [editingMode, setEditingMode] = useState<boolean>(false)
  const [hoveringAvatar, setHoveringAvatar] = useState<boolean>(false)
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: ''
    },
    resolver: yupResolver(profileSchema)
  })

  const { data: userData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = userData?.data.data

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name || '')
      setValue('phone', profile.phone || '')
      setProfile(profile)
      setProfileToLS(profile)
    }
  }, [profile, setValue, setProfile])

  const toggleEditingProfile = () => {
    setEditingMode(!editingMode)
  }

  const showUploadAvatar = () => {
    setHoveringAvatar(true)
  }

  const updateProfileMutation = useMutation(userApi.updateProfile)
  const onSubmit = handleSubmit(async (data) => {
    if (data.name !== profile?.name || data.phone !== profile?.phone) {
      await updateProfileMutation.mutateAsync({ ...data })
      // setProfile(res.data.data)
      refetch()
      showSuccessDialog(setSuccessDialogOpen)
    }
    setEditingMode(false)
  })

  if (!profile) return null
  return (
    <div className=' relative mx-8 my-16 rounded-lg bg-lightBg p-4 dark:bg-darkBg'>
      <div className='relative -top-10 flex items-center justify-between'>
        <div className='flex items-center'>
          {editingMode && (
            <div
              className='relative h-32 w-32 overflow-hidden rounded-full border-[5px] border-vintageColor dark:border-haretaColor'
              onMouseEnter={showUploadAvatar}
              onMouseLeave={() => setHoveringAvatar(false)}
            >
              <img
                src={
                  profile.avatar
                    ? profile.avatar.url
                    : 'https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1685458010/autoexpress/2023/05/Porsche%20911%20GTS%20UK%20001_otx6j7.jpg'
                }
                alt={profile.name}
                className='h-full w-full rounded-full  object-cover '
              />
              {hoveringAvatar && (
                <div className='absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white/60 dark:bg-black/60'>
                  <p className='font-semibold'>Upload avatar</p>
                </div>
              )}
            </div>
          )}
          {!editingMode && (
            <div className='h-32 w-32 rounded-full border-[5px] border-lightBg dark:border-darkBg'>
              <img
                src={
                  profile.avatar
                    ? profile.avatar.url
                    : 'https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1685458010/autoexpress/2023/05/Porsche%20911%20GTS%20UK%20001_otx6j7.jpg'
                }
                alt={profile.name}
                className='h-full w-full rounded-full  object-cover '
              />
            </div>
          )}
          <div className='ml-8 flex flex-col space-y-1'>
            <p className='text-2xl'>{profile.name}</p>
            <p className='text-textDark/60 dark:text-textLight/60'>Joined in {profile.created_at}</p>
          </div>
        </div>
        <div className=''>
          {!editingMode && (
            <button
              className='flex h-full space-x-2 rounded-md bg-vintageColor/80 px-4 py-2 text-textDark hover:bg-vintageColor 
              dark:bg-haretaColor/90 dark:text-textLight dark:hover:bg-haretaColor/60'
              onClick={toggleEditingProfile}
            >
              <FontAwesomeIcon icon={faUserPen} />
              <p>Edit Account</p>
            </button>
          )}
        </div>
      </div>

      {!editingMode && (
        <div className='space-y-2 rounded-lg bg-[#e8e8e8] px-6 py-4 dark:bg-[#202020] '>
          <div className=''>
            <p className='text-lg uppercase text-textDark/60 dark:text-textLight/60'>Name</p>
            <div>
              <p className=' py-1 text-base '>{profile.name}</p>
              <div className='mt-1 min-h-[1.25rem]'></div>
            </div>
          </div>
          <div className=''>
            <p className='text-lg uppercase text-textDark/60 dark:text-textLight/60'>Phone number</p>
            <div>
              <p className=' py-1 text-base '>{profile.phone}</p>
              <div className='mt-1 min-h-[1.25rem]'></div>
            </div>
          </div>
          <div className=''>
            <p className='text-lg uppercase text-textDark/60 dark:text-textLight/60'>email</p>
            <p className=' py-1 text-base '>{profile.email}</p>
          </div>
          {/* <div className=''>
              <p className='text-lg uppercase text-textDark/60 dark:text-textLight/60'>Password</p>
              <div>
                <p className='px-2 py-1 text-base '>{profile.email}</p>
                <div className='mt-1 min-h-[1.25rem]'></div>
              </div>
            </div> */}
        </div>
      )}

      {editingMode && (
        <form
          className='space-y-2 rounded-lg bg-[#e8e8e8] px-6 py-4  text-textDark dark:bg-[#202020] dark:text-textLight'
          onSubmit={onSubmit}
        >
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
                errorMessage={errors.name?.message}
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
          <div className=''>
            <p className='text-lg uppercase text-textDark/60 dark:text-textLight/60'>email</p>
            <p className=' py-1 text-base '>{profile.email}</p>
          </div>

          <div className='flex items-center space-x-2'>
            <button
              className='flex items-center space-x-1 rounded-md bg-vintageColor/80 px-4 py-2 text-textDark hover:bg-vintageColor dark:bg-haretaColor/90 dark:text-textLight dark:hover:bg-haretaColor/60'
              type='submit'
            >
              <p>Save</p>
            </button>
            <button
              className='flex items-center space-x-1 rounded-md px-4 py-2 text-textDark hover:underline dark:text-textLight'
              onClick={() => {
                setEditingMode(false)
              }}
              type='button'
            >
              <p>Cancel</p>
            </button>
          </div>
        </form>
      )}

      <DialogPopup
        isOpen={successDialogOpen}
        handleClose={() => {
          setSuccessDialogOpen(false)
        }}
        classNameWrapper='relative w-72 max-w-md transform overflow-hidden rounded-2xl p-6 align-middle shadow-xl transition-all'
      >
        <div className=' text-center'>
          <FontAwesomeIcon
            icon={faCheck}
            fontSize={36}
            className={classNames('text- rounded-full  p-4 text-center text-success ', {
              'bg-black/20': theme === 'light',
              'bg-white/20': theme === 'dark'
            })}
          />
        </div>
        <p className='mt-6 text-center text-xl font-medium leading-6'>Your profile was updated</p>
        <button
          type='button'
          className={classNames(
            'absolute right-2 top-2 flex justify-center rounded-md p-2 text-sm font-medium  hover:text-red-600 ',
            {
              'text-textDark/50': theme === 'light',
              'text-textLight/50': theme === 'dark'
            }
          )}
        >
          <FontAwesomeIcon icon={faXmark} fontSize={20} />
        </button>
      </DialogPopup>
    </div>
  )
}
