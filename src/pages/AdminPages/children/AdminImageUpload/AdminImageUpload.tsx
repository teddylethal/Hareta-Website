import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { imageApi } from 'src/apis/image.api'
import DialogPopup from 'src/components/DialogPopup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import MultipleFilesInput from 'src/components/MultipleFilesInput'

export default function AdminImageUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)

  //! UPLOAD IMAGE
  const queryClient = useQueryClient()
  const uploadImageMutation = useMutation({
    mutationFn: imageApi.uploadImage
  })
  const handleSubmit = () => {
    setExcutingDialog(true)
    setExcuting(true)
    try {
      for (let i = 0; i < files.length; i++) {
        const body = {
          file: files[i]
        }
        uploadImageMutation.mutate(body)
      }
    } catch (error) {
      console.warn(error)
    }

    queryClient.invalidateQueries({ queryKey: ['admin_image_list'] })
    setFiles([])
    setExcuting(false)
  }

  //! HANDLE FILES
  const handleChangeFiles = (files: File[]) => {
    setFiles(files)
  }

  const removeFile = (fileIndex: number) => () => {
    setFiles(files.filter((_, index) => index != fileIndex))
  }

  return (
    <div className='flex justify-center'>
      <div className='min-h-20 flex max-h-80 w-full flex-col justify-center rounded-lg border border-white/40 bg-darkColor700 px-4 py-2 desktop:max-h-[600px]'>
        {files.length > 0 && (
          <div className='mb-4 grid w-full grid-cols-3 gap-2 overflow-auto tablet:grid-cols-4 desktop:grid-cols-5'>
            {files.map((file, index) => {
              const previewImage = file ? URL.createObjectURL(file) : ''
              return (
                <div key={index} className='col-span-1'>
                  <div className='relative w-full overflow-hidden rounded-md border border-black/20 pt-[100%]'>
                    <img src={previewImage} alt='ảnh' className='absolute left-0 top-0 h-full w-full object-cover ' />
                    <button
                      onClick={removeFile(index)}
                      className='absolute right-1 top-1 rounded-md bg-black/40 p-1 text-xs hover:text-alertRed desktop:text-sm'
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className='flex w-full justify-center'>
          <MultipleFilesInput
            buttonStyle='flex py-1 h-20 w-full hover:bg-black/10 cursor-pointer items-center justify-center rounded-md text-primaryColor text-sm desktop:text-base border border-white/40 font-medium'
            handleChangeFiles={handleChangeFiles}
            setFiles={setFiles}
          />
        </div>

        <div className='mt-4 flex w-full justify-end'>
          <button
            onClick={handleSubmit}
            disabled={files.length == 0}
            className='flex items-center justify-center rounded-md bg-unhoveringBg px-4 py-1.5 text-sm font-medium hover:bg-hoveringBg disabled:opacity-40 disabled:hover:cursor-not-allowed disabled:hover:bg-unhoveringBg desktop:px-8 desktop:text-base'
          >
            Upload
          </button>
        </div>
      </div>
      <DialogPopup
        isOpen={excutingDialog}
        handleClose={() => {
          setExcutingDialog(false)
        }}
      >
        {excuting && (
          <ColorRing
            visible={true}
            height='80'
            width='80'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={['#0096C7', '#0096C7', '#0096C7', '#0096C7', '#0096C7']}
          />
        )}
        {!excuting && (
          <p className='text-success text-center text-xl font-medium uppercase leading-6'>Upload hình ảnh thành công</p>
        )}
      </DialogPopup>
    </div>
  )
}
