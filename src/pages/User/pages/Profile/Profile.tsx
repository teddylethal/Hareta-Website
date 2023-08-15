import { Box, Button, Input, TextField } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { Link } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { userApi } from 'src/apis/user.api'
import ProfileUpdateForm from '../../components/ProfileUpdateForm'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import UserInput from '../../components/UserInput'
import Avatar from '../../components/Avatar'
import { UserSchema, userSchema } from 'src/utils/rules'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import UserInfo from '../../components/UserInfo'
import path from 'src/constants/path'

type FormData = UserSchema
const profileSchema = userSchema

export default function Profile() {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    watch
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: ''
    },
    resolver: yupResolver(profileSchema)
  })

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data
  const uploadAvatarMutation = useMutation(userApi.uploadAvatar)

  console.log(profileData)
  useEffect(() => {
    if (profileData) {
      setProfile(profileData.data.data)
      setProfileToLS(profileData.data.data)
    }
  }, [profileData, setProfile])
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('email', profile.email)
      setValue('phone', profile.phone)
      console.log(123, profile)
    }
  }, [profile])

  const [form, setForm] = useState<boolean>(false)

  const handleClickForm = () => {
    setForm(!form)
  }

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      if (file) {
        const form = new FormData()
        form.append('file', file)
        const uploadRes = await uploadAvatarMutation.mutateAsync(form)
        // console.log(uploadRes.data.data)
        // const avatarName = uploadRes.data.data
      }
      refetch()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div className='round-sm pl-10 shadow'>
      <div className='border-b border-b-gray-200 pb-5'>
        <h1 className='text-2xl font-bold'>My Account</h1>
        <h1>General Information</h1>
      </div>
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

        <Box className='ml-20 grid w-[550px] grid-cols-2 gap-16 rounded-xl border-[3px] border-black'>
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
            <UserInfo className='invisible' icon={<AccessTimeIcon />} title='Join at' content={profile?.created_at} />
            <Link to={path.profileEdit}>
              <button className='flex h-[47.2px] w-[80px] items-center justify-center rounded-md bg-blue-500 text-white'>
                Edit
              </button>
            </Link>
          </Box>
        </Box>
      </Box>
      {/* <form className='flex flex-col justify-start pt-10 md:flex-row' onSubmit={onSubmit}>
        <Avatar file={file} setFile={setFile} />

        <div className='ml-20 grid w-[512px]'>
          <UserInput icon={<EmailIcon />} title='Email' name='email' disabled register={register} />
          <UserInput
            icon={<PersonIcon />}
            title='Full Name'
            name='name'
            register={register}
            // className=
            errorMessage={errors.name?.message}
          />
          <UserInput
            icon={<LocalPhoneOutlinedIcon />}
            title='Phone Number'
            name='phone'
            register={register}
            // className=
          />
          <Button type='submit'>Save</Button>
        </div>
      </form> */}
      {/* <Box className='flex justify-center'>
        <Button onClick={handleClickForm}>
          <KeyboardArrowDownIcon />
        </Button>
      </Box>
      {form && <div className='rounded-sm border-2 pt-10 shadow-sm'>{profile && <ProfileUpdateForm />}</div>} */}
    </div>
  )
}
