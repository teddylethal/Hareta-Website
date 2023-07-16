import { Button, TextField, Avatar, Box } from '@mui/material'
import { useState, useEffect } from 'react'
export default function InfoForm() {
  return (
    <Box className='flex flex-col'>
      <Box className='m flex h-[12rem] w-full justify-start'>
        <h1 className='m-6 text-lg'>Change your information</h1>
        <Box className='flex h-full w-2/5 flex-col justify-between'>
          <TextField id='outlined-basic' label='Name' variant='outlined' />
          <TextField id='outlined-basic' label='Phone Number' variant='outlined' />
          <TextField id='outlined-basic' label='ID' variant='outlined' />
        </Box>
      </Box>
      <Button variant='contained' className='ml-6 mt-6 w-[1.5rem]'>
        Save
      </Button>
    </Box>
  )
}
