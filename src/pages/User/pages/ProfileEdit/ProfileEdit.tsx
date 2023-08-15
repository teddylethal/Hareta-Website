import { Box, Button, Input, TextField } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import { Link, useNavigate } from 'react-router-dom'
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

export default function ProileEdit() {
  const navigate = useNavigate()
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
      <form className='flex flex-col justify-start pt-10 md:flex-row' onSubmit={onSubmit}>
        <Avatar file={file} setFile={setFile} />

        <div className='ml-20 w-[420px]'>
          <>
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
          </>

          <Box className='flex w-full justify-end'>
            <button type='submit' className='h-10 w-20 rounded-md bg-blue-500 text-white'>
              Save
            </button>
            <button
              onClick={() => setTimeout(() => navigate(path.profile), 1000)}
              // to={path.profile}
              type='button'
              className='ml-1 flex h-10 w-20 items-center justify-center rounded-md bg-blue-500 text-white'
            >
              Cancel
            </button>
          </Box>
        </div>
      </form>
      {/* <Box className='flex justify-center'>
        <Button onClick={handleClickForm}>
          <KeyboardArrowDownIcon />
        </Button>
      </Box>
      {form && <div className='rounded-sm border-2 pt-10 shadow-sm'>{profile && <ProfileUpdateForm />}</div>} */}
    </div>
  )
}
