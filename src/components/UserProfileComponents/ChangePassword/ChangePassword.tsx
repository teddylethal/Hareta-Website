import { Box, TextField } from '@mui/material'

export default function Content() {
  return (
    <div className='border-box flex h-full flex-col'>
      <div className='ml-5 flex h-1/6 w-full items-center text-2xl'>Filter</div>
      <div className='flex h-1/3 w-full flex-col md:flex-row '>
        <div className='m-2 flex h-full w-full md:w-1/5'>
          <div className='text-lg'>Change your password:</div>
        </div>
        <Box className='flex h-full w-2/5 flex-col justify-between'>
          <TextField id='outlined-basic' label='Old Password' variant='outlined' />
          <TextField id='outlined-basic' label='New Password' variant='outlined' />
          <TextField id='outlined-basic' label='Repeat Your Password' variant='outlined' />
        </Box>
      </div>
    </div>
  )
}
