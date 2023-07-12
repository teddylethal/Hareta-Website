import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
export default function Info() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    console.log(name, email, phone)
  })

  return (
    <div className='flex h-5/6 flex-col md:flex-row'>
      <div className='mx-10 flex h-2/3 w-3/5 flex-col justify-around'>
        <div className='flex justify-around'>
          <div className='flex w-1/4 items-center justify-center'>
            <h1>Your Name</h1>
          </div>
          <TextField
            label='Your Name'
            variant='outlined'
            onChange={(e) => setName(e.target.value)}
            value={name}
            sx={{ size: { xl: 'normal', xs: 'small' } }}
          />
        </div>

        <div className='flex justify-around'>
          <div className='flex w-1/4 items-center justify-center'>
            <h1>Email</h1>
          </div>
          <TextField label='Email' variant='outlined' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className='flex justify-around'>
          <div className='flex w-1/4 items-center justify-center'>
            <h1>Phone</h1>
          </div>
          <TextField label='Phone' variant='outlined' onChange={(e) => setPhone(e.target.value)} value={phone} />
        </div>

        <div className='flex justify-end'>
          <Button variant='contained' size='small'>
            Lưu
          </Button>
        </div>
      </div>

      <div className='h-1/2 w-1/5'>
        <input type='file' />
      </div>
    </div>
  )
}
