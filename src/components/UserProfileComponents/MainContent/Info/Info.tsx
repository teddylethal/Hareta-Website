import { Button, TextField, Avatar, Box } from '@mui/material'
import { useState, useEffect } from 'react'

export default function Info() {
  const [name, setName] = useState('Bui Trong Van')
  const [email, setEmail] = useState('trongvan159357@gmail.com')
  const [phone, setPhone] = useState('123456')
  const [createat, setCreateat] = useState('0:00')
  const [mode, setMode] = useState(true)

  const handleSetting = () => {
    setTimeout(() => {
      setMode(!mode)
    }, 2000)
  }
  return (
    <div className='h-[25rem] border-t-2 border-solid'>
      <Box className='mt-6 flex h-[20rem] w-full justify-around'>
        <Avatar
          alt='notloading'
          src='https://thumbs.dreamstime.com/b/cartoon-monster-face-square-avatar-97161029.jpg'
          sx={{ width: { md: 160, xs: 60 }, height: { md: 160, xs: 60 } }}
          className=''
        />
        <Box className='relative flex h-full w-3/5 flex-col items-end'>
          {mode && (
            <Box className='flex h-4/5 w-full border-2 border-solid'>
              <Box className='h-full w-1/2'>
                <Box className='h-1/3 w-full'>
                  <h1 className='text-xl'>Your Name</h1>
                  <h1 className='font-semibold'>{name}</h1>
                </Box>
                <Box className='h-1/3 w-full'>
                  <h1 className='text-xl'>Email</h1>
                  <h1 className='font-semibold'>{email}</h1>
                </Box>
                <Box className='h-1/3 w-full'>
                  <h1 className='text-xl'>Phone Number</h1>
                  <h1 className='font-semibold'>{phone}</h1>
                </Box>
              </Box>
              <Box className='h-full w-1/2'>
                <Box className='h-1/3 w-full'>
                  <h1 className='text-xl'>Create at</h1>
                  <h1 className='font-semibold'>{createat}</h1>
                </Box>
              </Box>
            </Box>
          )}

          {!mode && (
            <Box className='flex h-4/5 w-full border-2 border-solid'>
              <Box className='h-full w-1/2'>
                <Box className='h-1/3 w-full'>
                  <h1 className='text-xl'>Your Name</h1>
                  <TextField id='outlined-basic' defaultValue={name} variant='outlined' size='small' />
                </Box>
                <Box className='h-1/3 w-full'>
                  <h1 className='text-xl'>Email</h1>
                  <TextField id='outlined-basic' defaultValue={email} variant='outlined' size='small' />
                </Box>
                <Box className='h-1/3 w-full'>
                  <h1 className='text-xl'>Phone Number</h1>
                  <TextField id='outlined-basic' defaultValue={phone} variant='outlined' size='small' />
                </Box>
              </Box>
              <Box className='h-full w-1/2'>
                <Box className='h-1/3 w-full'>
                  <h1 className='text-xl'>Create at</h1>
                  <TextField id='outlined-basic' defaultValue={createat} variant='outlined' size='small' />
                </Box>
              </Box>
            </Box>
          )}
          {mode && (
            <Button variant='contained' onClick={handleSetting} className='w-20'>
              Change
            </Button>
          )}

          {!mode && (
            <Button
              variant='contained'
              onClick={() => {
                setMode(!mode)
              }}
              className='w-20'
            >
              Save
            </Button>
          )}
        </Box>
      </Box>
    </div>
    // <div className='flex h-5/6 flex-col md:flex-row'>
    //   <div className='mx-10 flex h-2/3 w-4/5 flex-col justify-around md:w-3/5'>
    //     <div className='flex justify-between'>
    //       <div className='flex w-2/5 items-center justify-end'>Full Name</div>
    //       <TextField
    //         label='Your Name'
    //         variant='outlined'
    //         onChange={(e) => setName(e.target.value)}
    //         value={name}
    //         className='w-1/2'
    //       />
    //     </div>
    //     <div className='flex justify-between'>
    //       <div className='flex w-2/5 items-center justify-end'>Day of Birth</div>
    //       <DatePicker label='Your Birthday' value={birthday} onChange={(e) => setBirthday(e)} className='w-1/2' />
    //       {/* <TextField
    //         label='Your Name'
    //         variant='outlined'
    //         onChange={(e) => setName(e.target.value)}
    //         value={name}
    //         className='w-1/2'
    //       /> */}
    //     </div>

    //     <div className='flex justify-between'>
    //       <div className='flex w-2/5 items-center justify-end'>Phone Number</div>
    //       <TextField
    //         label='Phone'
    //         variant='outlined'
    //         onChange={(e) => setPhone(e.target.value)}
    //         value={phone}
    //         className='w-1/2'
    //       />
    //     </div>

    //     <div className='flex justify-between'>
    //       <div className='flex w-2/5 items-center justify-end'>Email</div>
    //       <TextField
    //         variant='outlined'
    //         onChange={(e) => setEmail(e.target.value)}
    //         value={email}
    //         className='w-1/2'
    //         disabled
    //       />
    //     </div>

    //     <div className='flex justify-end'>
    //       <Button variant='contained' size='small'>
    //         Lưu
    //       </Button>
    //     </div>
    //   </div>

    //   <div className='h-1/2 w-1/5'>
    //     <input type='file' />
    //   </div>
    // </div>
  )
}
