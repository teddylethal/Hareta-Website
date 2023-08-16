import { useContext, useMemo, useRef, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import upload from 'src/assets/upload.jpg'
interface Props {
  file: File | undefined
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
}

export default function Avatar({ file, setFile }: Props) {
  const { profile } = useContext(AppContext)

  // const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    setFile(fileFromLocal)
  }
  console.log(file?.size, 123)

  return (
    <div className='flex flex-col items-center'>
      <div className='relative h-48 w-48 overflow-hidden rounded-full border border-black/10'>
        <img
          src={
            previewImage ||
            profile?.avatar?.url ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
          }
          // src='https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/258764879_4596602470418676_7242401939304191255_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=mZBJYVBs-OEAX9pIv7E&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBLBm0-L-SFhLlJ09qhSoynvRpJOjNkQ7BHzn9Bq6-png&oe=64C3E83E'
          alt='avatar'
          className={`absolute h-full w-full rounded-full object-cover hover:opacity-20 ${file ? '' : 'opacity-20'}`}
        />
        <button className='h-full w-full rounded-full object-cover' onClick={handleUpload}>
          <img
            src={upload}
            // src='https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/258764879_4596602470418676_7242401939304191255_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=mZBJYVBs-OEAX9pIv7E&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBLBm0-L-SFhLlJ09qhSoynvRpJOjNkQ7BHzn9Bq6-png&oe=64C3E83E'
            alt='avatar'
            className={`+ h-full w-full rounded-full object-cover opacity-0 hover:opacity-60 ${
              file ? '' : 'opacity-60'
            }`}
          />
        </button>
        {/* <CloudUploadIcon className='ml-50 mt-50 absolute' /> */}
      </div>
      <input className='hidden' type='file' accept='.jpg,.jpeg,.png' ref={fileInputRef} onChange={onFileChange} />

      <div className='mt-5 border-t-2 border-gray-200 pt-5'>Use image less than 5MB</div>
    </div>
  )
}
