import Info from 'src/components/UserProfileComponents/MainContent/Info'
import InfoForm from 'src/components/UserProfileComponents/InfoForm'
import { Box, Button } from '@mui/material'
export default function Content() {
  return (
    <div className='border-box flex h-full flex-col'>
      <div className='ml-5 flex h-16 w-full items-center text-2xl'> Thông tin cá nhân</div>
      <Info />
      {/* <Box className='h-32 bg-green-600'>aa</Box> */}
      {/* <Box className='flex h-[3rem] justify-center'>
          <Button>Downward</Button>
        </Box> */}
      {/* <InfoForm /> */}
    </div>
  )
}
