import { Box, Button } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { userApi } from 'src/apis/user.api'
import ProfileUpdateForm from '../../components/ProfileUpdateForm'
import { useState } from 'react'

export default function Profile() {
  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data

  const [form, setForm] = useState<boolean>(false)

  const handleClickForm = () => {
    setForm(!form)
  }

  return (
    <div className='round-sm pl-10 shadow'>
      <div className='border-b border-b-gray-200 pb-5'>
        <h1 className='text-2xl'>My Account</h1>
        <h1>General Information</h1>
      </div>
      <div className='flex flex-col justify-start pt-10 md:flex-row'>
        <div className='flex flex-col items-center justify-center'>
          <div className='h-48 w-48 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
            <img
              src='https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/258764879_4596602470418676_7242401939304191255_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=mZBJYVBs-OEAX9pIv7E&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBLBm0-L-SFhLlJ09qhSoynvRpJOjNkQ7BHzn9Bq6-png&oe=64C3E83E'
              alt='avatar'
              className='h-full w-full object-cover'
            ></img>
          </div>
        </div>
        <div className='ml-20 grid w-[512px] grid-cols-2 gap-8 rounded-xl border-4 border-black'>
          <Box className='grid-span-1 flex h-full flex-col justify-around'>
            <div className='flex items-center'>
              <PersonIcon className='mr-2' />
              <div>
                <div>Full Name:</div>
                <div className='font-bold'>{profile?.name}</div>
              </div>
            </div>
            <div className='flex items-center'>
              <EmailIcon className='mr-2' />
              <div className='w-full'>
                <div>Email:</div>
                <div className='w-full truncate font-bold'>{profile?.email}</div>
              </div>
            </div>
            <div className='flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='mr-2 h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
                />
              </svg>
              <div>
                <div>Password:</div>
                <Link to='/user/ChangePassword' className='text-blue-600'>
                  ************
                </Link>
              </div>
            </div>
          </Box>

          <Box className='grid-span-1 flex h-full flex-col justify-around'>
            <div className='flex items-center'>
              <LocalPhoneOutlinedIcon className='mr-2' />
              <div>
                <div>Phone Number:</div>
                <div className='font-bold'>{profile?.phone}</div>
              </div>
            </div>
            <div className='flex items-center'>
              <HomeOutlinedIcon className='mr-2' />
              <div className='w-full'>
                <div>Address:</div>
                <div className='w-full truncate font-bold'>abcxyz</div>
              </div>
            </div>
            <div className='invisible flex'>
              <HomeOutlinedIcon className='mr-2' />
              <div className='w-full'>
                <div>Address:</div>
                <div className='w-full truncate font-bold'>abcxyz</div>
              </div>
            </div>
          </Box>
        </div>
      </div>
      <Box className='flex justify-center'>
        <Button onClick={handleClickForm}>
          <KeyboardArrowDownIcon />
        </Button>
      </Box>
      {form && <div className='pt-10'>{profile && <ProfileUpdateForm profile={profile} />}</div>}
    </div>
  )
}
