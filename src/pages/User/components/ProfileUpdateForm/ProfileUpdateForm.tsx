import { Link } from 'react-router-dom'
import path from 'src/constants/path'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box } from '@mui/material'
import { useRef } from 'react'
import { User } from 'src/types/user.type'

interface Props {
  profile: User
}

export default function ProfileUpdateForm({ profile }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
  }
  return (
    <div className='flex flex-col-reverse justify-start px-2 md:flex-row md:px-7'>
      <form className='mt-6 flex-grow md:pr-12'>
        <div className='flex flex-col flex-wrap sm:flex-row'>
          <div className='capitalize sm:w-[20%] sm:text-right'>Email</div>
          <div className='sm:w-4/5 sm:pl-5'>
            <div className=' text-gray-700'>{profile.email}</div>
          </div>
        </div>

        <div className='mt-3 flex flex-col flex-wrap sm:flex-row'>
          <div className='capitalize sm:w-[20%] sm:text-right'>Full Name</div>
          <div className='sm:w-4/5 sm:pl-5'>
            <input placeholder='Full Name' />
          </div>
        </div>

        <div className='mt-3 flex flex-col flex-wrap sm:flex-row'>
          <div className='capitalize  sm:w-[20%] sm:text-right'>Phone Number</div>
          <div className='sm:w-4/5 sm:pl-5'>
            <input placeholder='Phone Number' />
          </div>
        </div>

        <div className='mt-3 flex flex-col flex-wrap sm:flex-row'>
          <div className='capitalize  sm:w-[20%] sm:text-right'>Address</div>
          <div className='sm:w-4/5 sm:pl-5'>
            <input placeholder='Address' />
          </div>
        </div>

        <button type='submit'>a</button>
      </form>

      <Box className='flex justify-center md:w-72 md:border-l'>
        <div className='flex flex-col items-center'>
          <div className='my-5 h-24 w-24'>
            <img
              src='https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/258764879_4596602470418676_7242401939304191255_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=mZBJYVBs-OEAX9pIv7E&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBLBm0-L-SFhLlJ09qhSoynvRpJOjNkQ7BHzn9Bq6-png&oe=64C3E83E'
              alt='avatar'
              className='h-full w-full rounded-full object-cover'
            ></img>
          </div>
          <input className='hidden' type='file' accept='.jpg,.jpeg,.png' ref={fileInputRef} onChange={onFileChange} />
          <button
            className='flex h-10 items-center rounded-sm border bg-gray-300 px-6 text-sm shadow-sm'
            onClick={handleUpload}
          >
            Choose image
          </button>
        </div>
      </Box>
    </div>
  )
}
