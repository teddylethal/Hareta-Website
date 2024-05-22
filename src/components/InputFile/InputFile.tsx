import React, { Fragment, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChangeImageFile?: (file?: File) => void
  buttonClassname?: string
}

export default function InputFile({
  onChangeImageFile,
  buttonClassname = 'absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white/60 dark:bg-black/60'
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadAvatar = () => {
    fileInputRef.current?.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal.size > config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('error file')
    } else {
      onChangeImageFile && onChangeImageFile(fileFromLocal)
    }
  }

  //! Multi languages
  const { t } = useTranslation('user')

  return (
    <Fragment>
      <input
        type='file'
        accept='.jpg,.jpeg,.png'
        className='hidden'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => ((event.target as HTMLInputElement).value = '')}
      />
      <button className={buttonClassname} onClick={handleUploadAvatar} type='button'>
        <p className='text-xs font-semibold tablet:text-sm desktop:text-base'>{t('profile.upload avatar')}</p>
      </button>
    </Fragment>
  )
}
