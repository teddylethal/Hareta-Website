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
import { showSuccessDialog } from 'src/utils/utils'import { ErrorRespone } from 'src/types/utils.type'
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

  const uploadAvatarMutation = useMutation({ mutationFn: userApi.uploadAvatar })
  const updateProfileMutation = useMutation({ mutationFn: userApi.updateProfile })
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
      <div className='relative mx-2 my-12 rounded-lg bg-lightBg p-2 dark:bg-darkBg desktop:mx-8 desktop:my-16 desktop:p-4'>
        <div className='relative -top-4 flex items-center justify-between desktop:-top-10'>
          <div className='flex items-center'>
            {editingMode && (
              <div
                className='relative h-20 w-20 overflow-hidden rounded-full border-[5px] border-vintageColor dark:border-haretaColor desktop:h-32 desktop:w-32'
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
              <div className='relative h-20 w-20 rounded-full border-[5px] border-[#f8f8f8] dark:border-[#181818] desktop:h-32 desktop:w-32'>
                <img
                  src={avatar}
                  alt={profile.name}
                  className='absolute left-0 top-0 h-full w-full rounded-full object-cover '
                />
              </div>
            )}
            <div className='ml-2 flex flex-col space-y-1 tabletSmall:ml-4 desktop:ml-8'>
              <p className='text-base tabletSmall:text-lg desktop:text-2xl'>{profile.name}</p>
              <p className='truncate text-xs text-darkText/60 dark:text-lightText/60 tabletSmall:text-sm desktop:text-base'>
                {t('profile.joined')} {formatDate(profile.created_at)}
              </p>
            </div>
          </div>
          <div className=''>
            {!editingMode && (
              <button
                className='flex h-full space-x-2 rounded-md bg-vintageColor/90 px-2 py-1 text-darkText hover:bg-vintageColor dark:bg-haretaColor/90 dark:text-lightText dark:hover:bg-haretaColor/60 desktop:px-4 desktop:py-2'
                onClick={() => setEditingMode(true)}
              >
                <FontAwesomeIcon icon={faUserPen} className='h-auto w-4 tabletSmall:w-5 desktop:w-6' />
                {!isMobile && <p>{t('profile.edit')}</p>}
              </button>
            )}
          </div>
        </div>

        {!editingMode && (
          <div className='space-y-2 rounded-lg bg-[#e8e8e8] px-6 py-4 dark:bg-[#202020] '>
            <div className=''>
              <p className='text-base font-semibold uppercase text-darkText/60 dark:text-lightText/60 desktop:text-lg'>
                {t('profile.name')}
              </p>
              <div>
                <p className='py-1 text-sm  desktop:text-base '>{profile.name}</p>
                <div className='mt-1 min-h-[1.25rem]'></div>
              </div>
            </div>
            <div className=''>
              <p className='text-base font-semibold uppercase text-darkText/60 dark:text-lightText/60 desktop:text-lg'>
                {t('profile.phone number')}
              </p>
              <div>
                <p className='py-1 text-sm  desktop:text-base '>{profile.phone}</p>
                <div className='mt-1 min-h-[1.25rem]'></div>
              </div>
            </div>
            <div className=''>
              <p className='text-base font-semibold uppercase text-darkText/60 dark:text-lightText/60 desktop:text-lg'>
                {t('profile.email')}
              </p>
              <p className='py-1 text-sm  desktop:text-base '>{profile.email}</p>
            </div>
          </div>
        )}

        {editingMode && (
          <FormProvider {...methods}>
            <form
              className='space-y-2 rounded-lg bg-[#e8e8e8] px-6 py-4  text-darkText dark:bg-[#202020] dark:text-lightText'
              onSubmit={onSubmit}
            >
              <EditProfile />
              <div className=''>
                <p className='text-base uppercase text-darkText/60 dark:text-lightText/60 desktop:text-lg'>
                  {t('profile.email')}
                </p>
                <p className='py-1 text-sm desktop:text-base '>{profile.email}</p>
              </div>

              <div className='flex items-center space-x-2 pt-4'>
                <button
                  className='flex items-center space-x-1 rounded-md bg-vintageColor/90 px-2 py-1 text-sm text-darkText hover:bg-vintageColor dark:bg-haretaColor/90 dark:text-lightText dark:hover:bg-haretaColor/60 desktop:px-4 desktop:py-2 desktop:text-base'
                  type='submit'
                >
                  <p>{t('profile.save')}</p>
                </button>
                <button
                  className='flex items-center space-x-1 rounded-md px-2 py-1 text-sm text-darkText hover:underline dark:text-lightText desktop:px-4 desktop:py-2 desktop:text-base'
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
