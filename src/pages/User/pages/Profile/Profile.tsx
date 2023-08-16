import { Box } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { userApi } from 'src/apis/user.api'
import UserInfo from '../../components/UserInfo'
import path from 'src/constants/path'
import ContentLayout from '../../layout/ContentLayout'
import { useState } from 'react'
import ProfileEdit from '../ProfileEdit'

// type FormData = UserSchema
// const profileSchema = userSchema

export default function Profile() {
  const [editMode, setEditMode] = useState(false)

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data
  console.log(profile)

  return (
    <ContentLayout
      title='My Account'
      subtitle='General Information'
      content={
        editMode ? (
          <ProfileEdit setEditMode={setEditMode} />
        ) : (
          <Box className='flex flex-col justify-start pt-10 md:flex-row'>
            <div className='h-48 w-48 overflow-hidden rounded-full border border-black/10'>
              <img
                src={
                  profile?.avatar?.url ||
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
                }
                // src='https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/258764879_4596602470418676_7242401939304191255_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_ohc=mZBJYVBs-OEAX9pIv7E&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBLBm0-L-SFhLlJ09qhSoynvRpJOjNkQ7BHzn9Bq6-png&oe=64C3E83E'
                alt='avatar'
                className='h-full w-full object-cover'
              ></img>
            </div>

            <Box className='ml-20 grid w-[550px] grid-cols-2 gap-16 rounded-xl border-[3px] border-gray-600 bg-gray-200'>
              <Box className='grid-span-1 ml-2 flex h-full flex-col justify-around'>
                <UserInfo icon={<PersonIcon sx={{ fontSize: 30 }} />} title='Full Name' content={profile?.name} />
                <UserInfo icon={<EmailIcon sx={{ fontSize: 30 }} />} title='Email' content={profile?.email} />
                <UserInfo
                  icon={<LocalPhoneOutlinedIcon sx={{ fontSize: 30 }} />}
                  title='Phone Number'
                  content={profile?.phone}
                />
              </Box>
              <Box className='grid-span-1 flex h-full flex-col justify-around'>
                <UserInfo
                  icon={<AccessTimeIcon sx={{ fontSize: 30 }} />}
                  title='Join at'
                  content={profile?.created_at.replace('T', '  ').replace('Z', '')}
                />
                <UserInfo
                  className='invisible'
                  icon={<AccessTimeIcon />}
                  title='Join at'
                  content={profile?.created_at}
                />
                <button
                  className='flex h-[47.2px] w-[80px] items-center justify-center rounded-md bg-blue-500 text-white'
                  onClick={() => {
                    setEditMode(true)
                  }}
                >
                  Edit
                </button>
              </Box>
            </Box>
          </Box>
        )
      }
    />
  )
}
