import { Box, TextField, Button } from '@mui/material'

export default function Content() {
  return (
    <div className='border-box flex flex-col'>
      <div className='ml-5 flex h-16 w-full items-center text-2xl'>Filter</div>
      <div className='flex h-[12rem] w-full flex-col border-t-2 border-solid md:flex-row'>
        <div className='m-2 flex h-full w-full md:w-1/5'>
          <div className='text-lg'>Change your password:</div>
        </div>
        <Box className='flex h-full w-2/5 flex-col justify-between'>
          <TextField id='outlined-basic' label='Old Password' variant='outlined' />
          <TextField id='outlined-basic' label='New Password' variant='outlined' />
          <TextField id='outlined-basic' label='Repeat Your Password' variant='outlined' />
        </Box>
        <Box className='flex flex-col items-center'>
          <div>Bảo mật tài khoản</div>
          <div> Nên đổi mật khẩu nếu như tài khoản có nguy cơ bị người lạ truy cập</div>
        </Box>
      </div>
      <Button variant='contained' className='w-1/6'>
        Reset
      </Button>
    </div>
  )
}
