import { Box } from '@mui/material'

import SideBarList from '../SideBarList'
type Props = {
  handleClick1: () => void
  handleClick2: () => void
}

import Card from 'src/components/UserProfileComponents/Card'
export default function SideBar({ handleClick1, handleClick2 }: Props) {
  return (
    <Box>
      <Card />
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <SideBarList handleClick1={handleClick1} handleClick2={handleClick2} />
      </Box>
    </Box>

    // <div className='hidden h-full w-1/5 flex-col text-center md:flex'>
    //   <Card />
    //   <Button onClick={handleClick1}>General</Button>
    //   <Button>Đơn hàng</Button>
    // </div>
  )
}
