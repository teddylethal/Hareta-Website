import { faCheck, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ThemeContext } from 'src/App'
import userApi from 'src/apis/user.api'
import DialogPopup from 'src/components/DialogPopup'
import InputFile from 'src/components/InputFile'
import { AppContext } from 'src/contexts/app.context'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import { ErrorRespone } from 'src/types/utils.type'
import { setProfileToLS } from 'src/utils/auth'
import { UserSchema, userSchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'
import EditProfile from './EditProfile'
import { useViewport } from 'src/hooks/useViewport'
import moment from 'moment'
import ProfileLoading from './ProfileLoading'

type FormData = Pick<UserSchema, 'name' | 'phone'>

const profileSchema = userSchema.pick(['name', 'phone'])

const formatDate = (timeStamp: string) => {
  return moment(timeStamp).utc().format('YYYY-MM-DD')
}

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const { theme } = useContext(ThemeContext)

  const [editingMode, setEditingMode] = useState<boolean>(false)
  const [hoveringAvatar, setHoveringAvatar] = useState<boolean>(false)
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false)
  const [avatarFile, setAvatarFile] = useState<File>()

  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768

  const previewImage = useMemo(() => {
    return avatarFile ? URL.createObjectURL(avatarFile) : ''
  }, [avatarFile])

  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: ''
    },
    resolver: yupResolver(profileSchema)
  })

  const { handleSubmit, setValue, setError, clearErrors } = methods

  const { data: userData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = userData?.data.data

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name || '')
      setValue('phone', profile.phone || '')
      clearErrors('name')
      clearErrors('phone')
      setProfile(profile)
      setProfileToLS(profile)
    }
  }, [profile, setValue, setProfile, clearErrors])

  const avatar: string =
    profile?.avatar?.url ||
    'https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1685458010/autoexpress/2023/05/Porsche%20911%20GTS%20UK%20001_otx6j7.jpg'

  const showUploadAvatar = () => {
    setHoveringAvatar(true)
  }

  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (avatarFile) {
        const form = new FormData()
        form.append('file', avatarFile)
        await uploadAvatarMutation.mutateAsync(form)
        refetch()
        showSuccessDialog(setSuccessDialogOpen)
      }
      if (data.name !== profile?.name || data.phone !== profile?.phone) {
        await updateProfileMutation.mutateAsync({ ...data })
        refetch()
        showSuccessDialog(setSuccessDialogOpen)
      }
      setEditingMode(false)
    } catch (error) {
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          const responeLog = formError?.log as string
          if (responeLog.search(`'name'`) !== -1) {
            setError('name', {
              message: 'User name is too long',
              type: 'Server'
            })
          }
          if (responeLog.search(`'phone'`) !== -1) {
            setError('phone', {
              message: 'Phone number is too long',
              type: 'Server'
            })
          }
        }
      }
    }
  })

  const handleCancel = () => {
    setValue('name', profile?.name || '')
    setValue('phone', profile?.phone || '')
    clearErrors('name')
    clearErrors('phone')
    setAvatarFile(undefined)
    setEditingMode(false)
  }

  const handleChangeAvatarFile = (file?: File) => {
    setAvatarFile(file)
  }

  if (!profile) return <ProfileLoading />
  else {
    return (
      <div className='relative mx-2 my-12 rounded-lg bg-lightBg p-2 dark:bg-darkBg lg:mx-8 lg:my-16 lg:p-4'>
        <div className='relative -top-4 flex items-center justify-between lg:-top-10'>
          <div className='flex items-center'>
            {editingMode && (
              <div
                className='relative h-20 w-20 overflow-hidden rounded-full border-[5px] border-vintageColor dark:border-haretaColor lg:h-32 lg:w-32'
                onMouseEnter={showUploadAvatar}
                onMouseLeave={() => setHoveringAvatar(false)}
              >
                <img
                  src={previewImage || avatar}
                  alt={profile.name}
                  className='absolute left-0 top-0 h-full w-full rounded-full object-cover '
                />
                {(hoveringAvatar || isMobile) && <InputFile onChangeImageFile={handleChangeAvatarFile} />}
              </div>
            )}
            {!editingMode && (
              <div className='relative h-20 w-20 rounded-full border-[5px] border-[#f8f8f8] dark:border-[#181818] lg:h-32 lg:w-32'>
                <img
                  src={avatar}
                  alt={profile.name}
                  className='absolute left-0 top-0 h-full w-full rounded-full object-cover '
                />
              </div>
            )}
            <div className='ml-2 flex flex-col space-y-1 sm:ml-4 lg:ml-8'>
              <p className='text-base sm:text-lg lg:text-2xl'>{profile.name}</p>
              <p className='truncate text-xs text-textDark/60 dark:text-textLight/60 sm:text-sm lg:text-base'>
                Joined in {formatDate(profile.created_at)}
              </p>
            </div>
          </div>
          <div className=''>
            {!editingMode && (
              <button
                className='flex h-full space-x-2 rounded-md bg-vintageColor/80 px-2 py-1 text-textDark hover:bg-vintageColor dark:bg-haretaColor/90 dark:text-textLight dark:hover:bg-haretaColor/60 lg:px-4 lg:py-2'
                onClick={() => setEditingMode(true)}
              >
                <FontAwesomeIcon icon={faUserPen} className='h-auto w-4 sm:w-5 lg:w-6' />
                {!isMobile && <p>Edit</p>}
              </button>
            )}
          </div>
        </div>

        {!editingMode && (
          <div className='space-y-2 rounded-lg bg-[#e8e8e8] px-6 py-4 dark:bg-[#202020] '>
            <div className=''>
              <p className=' text-base uppercase text-textDark/60 dark:text-textLight/60 lg:text-lg'>Name</p>
              <div>
                <p className='py-1 text-sm  lg:text-base '>{profile.name}</p>
                <div className='mt-1 min-h-[1.25rem]'></div>
              </div>
            </div>
            <div className=''>
              <p className=' text-base uppercase text-textDark/60 dark:text-textLight/60 lg:text-lg'>Phone number</p>
              <div>
                <p className='py-1 text-sm  lg:text-base '>{profile.phone}</p>
                <div className='mt-1 min-h-[1.25rem]'></div>
              </div>
            </div>
            <div className=''>
              <p className=' text-base uppercase text-textDark/60 dark:text-textLight/60 lg:text-lg'>email</p>
              <p className='py-1 text-sm  lg:text-base '>{profile.email}</p>
            </div>
          </div>
        )}

        {editingMode && (
          <FormProvider {...methods}>
            <form
              className='space-y-2 rounded-lg bg-[#e8e8e8] px-6 py-4  text-textDark dark:bg-[#202020] dark:text-textLight'
              onSubmit={onSubmit}
            >
              <EditProfile />
              <div className=''>
                <p className='text-base uppercase text-textDark/60 dark:text-textLight/60 lg:text-lg'>email</p>
                <p className='py-1 text-sm lg:text-base '>{profile.email}</p>
              </div>

              <div className='flex items-center space-x-2 pt-4'>
                <button
                  className='flex items-center space-x-1 rounded-md bg-vintageColor/80 px-2 py-1 text-sm text-textDark hover:bg-vintageColor dark:bg-haretaColor/90 dark:text-textLight dark:hover:bg-haretaColor/60 lg:px-4 lg:py-2 lg:text-base'
                  type='submit'
                >
                  <p>Save</p>
                </button>
                <button
                  className='flex items-center space-x-1 rounded-md px-2 py-1 text-sm text-textDark hover:underline dark:text-textLight lg:px-4 lg:py-2 lg:text-base'
                  onClick={handleCancel}
                  type='button'
                >
                  <p>Cancel</p>
                </button>
              </div>
            </form>
          </FormProvider>
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
        </DialogPopup>
      </div>
    )
  }
}
