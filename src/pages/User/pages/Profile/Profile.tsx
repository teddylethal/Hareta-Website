import { faCheck, faUserPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useContext, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

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
import { useTranslation } from 'react-i18next'

type FormData = Pick<UserSchema, 'name' | 'phone'>

const profileSchema = userSchema.pick(['name', 'phone'])

const formatDate = (timeStamp: string) => {
  return moment(timeStamp).utc().format('YYYY-MM-DD')
}

export default function Profile() {
  const { theme, setProfile } = useContext(AppContext)

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
    queryFn: userApi.getProfile,
    staleTime: 1000 * 60 * 3
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

  //? translation
  const { t } = useTranslation('user')

  if (!profile) return <ProfileLoading />
  else {
    return (
      <div className='lg:mx-8 lg:my-16 lg:p-4 relative mx-2 my-12 rounded-lg bg-lightBg p-2 dark:bg-darkBg'>
        <div className='lg:-top-10 relative -top-4 flex items-center justify-between'>
          <div className='flex items-center'>
            {editingMode && (
              <div
                className='lg:h-32 lg:w-32 relative h-20 w-20 overflow-hidden rounded-full border-[5px] border-vintageColor dark:border-haretaColor'
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
              <div className='lg:h-32 lg:w-32 relative h-20 w-20 rounded-full border-[5px] border-[#f8f8f8] dark:border-[#181818]'>
                <img
                  src={avatar}
                  alt={profile.name}
                  className='absolute left-0 top-0 h-full w-full rounded-full object-cover '
                />
              </div>
            )}
            <div className='sm:ml-4 lg:ml-8 ml-2 flex flex-col space-y-1'>
              <p className='sm:text-lg lg:text-2xl text-base'>{profile.name}</p>
              <p className='text-darkText/60 sm:text-sm lg:text-base dark:text-lightText/60 truncate text-xs'>
                {t('profile.joined')} {formatDate(profile.created_at)}
              </p>
            </div>
          </div>
          <div className=''>
            {!editingMode && (
              <button
                className='text-darkText lg:px-4 lg:py-2 dark:text-lightText flex h-full space-x-2 rounded-md bg-vintageColor/90 px-2 py-1 hover:bg-vintageColor dark:bg-haretaColor/90 dark:hover:bg-haretaColor/60'
                onClick={() => setEditingMode(true)}
              >
                <FontAwesomeIcon icon={faUserPen} className='sm:w-5 lg:w-6 h-auto w-4' />
                {!isMobile && <p>{t('profile.edit')}</p>}
              </button>
            )}
          </div>
        </div>

        {!editingMode && (
          <div className='space-y-2 rounded-lg bg-[#e8e8e8] px-6 py-4 dark:bg-[#202020] '>
            <div className=''>
              <p className='text-darkText/60 lg:text-lg dark:text-lightText/60 text-base font-semibold uppercase'>
                {t('profile.name')}
              </p>
              <div>
                <p className='lg:text-base py-1  text-sm '>{profile.name}</p>
                <div className='mt-1 min-h-[1.25rem]'></div>
              </div>
            </div>
            <div className=''>
              <p className='text-darkText/60 lg:text-lg dark:text-lightText/60 text-base font-semibold uppercase'>
                {t('profile.phone number')}
              </p>
              <div>
                <p className='lg:text-base py-1  text-sm '>{profile.phone}</p>
                <div className='mt-1 min-h-[1.25rem]'></div>
              </div>
            </div>
            <div className=''>
              <p className='text-darkText/60 lg:text-lg dark:text-lightText/60 text-base font-semibold uppercase'>
                {t('profile.email')}
              </p>
              <p className='lg:text-base py-1  text-sm '>{profile.email}</p>
            </div>
          </div>
        )}

        {editingMode && (
          <FormProvider {...methods}>
            <form
              className='text-darkText dark:text-lightText space-y-2 rounded-lg bg-[#e8e8e8]  px-6 py-4 dark:bg-[#202020]'
              onSubmit={onSubmit}
            >
              <EditProfile />
              <div className=''>
                <p className='text-darkText/60 lg:text-lg dark:text-lightText/60 text-base uppercase'>
                  {t('profile.email')}
                </p>
                <p className='lg:text-base py-1 text-sm '>{profile.email}</p>
              </div>

              <div className='flex items-center space-x-2 pt-4'>
                <button
                  className='text-darkText lg:px-4 lg:py-2 lg:text-base dark:text-lightText flex items-center space-x-1 rounded-md bg-vintageColor/90 px-2 py-1 text-sm hover:bg-vintageColor dark:bg-haretaColor/90 dark:hover:bg-haretaColor/60'
                  type='submit'
                >
                  <p>{t('profile.save')}</p>
                </button>
                <button
                  className='text-darkText lg:px-4 lg:py-2 lg:text-base dark:text-lightText flex items-center space-x-1 rounded-md px-2 py-1 text-sm hover:underline'
                  onClick={handleCancel}
                  type='button'
                >
                  <p>{t('profile.cancel')}</p>
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
          <p className='mt-6 text-center text-xl font-medium leading-6'>{t('profile.message')}</p>
        </DialogPopup>
      </div>
    )
  }
}
