import { Link } from 'react-router-dom'
import path from 'src/constants/path'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Box, TextField } from '@mui/material'
import { useContext, useRef, useState } from 'react'
import { User } from 'src/types/user.type'
import Input from 'src/components/Input'
import { useForm } from 'react-hook-form'
import { schema, Schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  profile: User
}
type FormData = Schema

export default function ProfileUpdateForm() {
  const { profile } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const [file, setFile] = useState<File>()

  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    setFile(fileFromLocal)
  }
  return (
    <div className='flex flex-col-reverse justify-center px-2 md:flex-row md:px-7'>
      <form className='mt-6 max-w-[600px] flex-grow'>
        <div className='flex flex-col flex-wrap items-center sm:flex-row'>
          <div className='capitalize sm:w-[20%] sm:text-right'>Email</div>
          <div className='sm:w-4/5 sm:pl-5'>
            {/* <div className=' text-gray-700'>{profile.email}</div> */}
            <TextField disabled size='small' defaultValue={profile?.email} />
          </div>
        </div>

        <div className='mt-3 flex flex-col flex-wrap items-center sm:flex-row'>
          <div className='capitalize sm:w-[20%] sm:text-right'>Full Name</div>
          <div className='sm:w-4/5 sm:pl-5'>
            {/* <input placeholder='Full Name' /> */}
            <TextField size='small' />
          </div>
        </div>

        <div className='mt-3 flex flex-col flex-wrap items-center sm:flex-row'>
          <div className='capitalize  sm:w-[20%] sm:text-right'>Phone Number</div>
          <div className='sm:w-4/5 sm:pl-5'>
            {/* <input placeholder='Phone Number' /> */}
            <TextField size='small' />
          </div>
        </div>

        <div className='mt-3 flex flex-col flex-wrap items-center sm:flex-row'>
          <div className='capitalize  sm:w-[20%] sm:text-right'>Address</div>
          <div className='sm:w-4/5 sm:pl-5'>
            {/* <input placeholder='Address' /> */}
            <TextField size='small' />
          </div>
        </div>

        <button type='submit'>a</button>
      </form>

      <Box className='flex justify-center md:w-72 md:border-l'>
        <div className='flex flex-col items-center'>
          <div className='my-5 h-24 w-24'>
            <img
              src={
                profile?.avatar?.url ||
                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
              }
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
