import { useState } from 'react'

import Header from 'src/components/UserProfileComponents/Header'
import SideBarList from 'src/components/UserProfileComponents/SideBarList'
import Card from 'src/components/UserProfileComponents/Card'

import Content from 'src/components/UserProfileComponents/Content'
import ChangePassword from 'src/components/UserProfileComponents/ChangePassword'

import { Drawer, Box } from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles'
export default function MyProfile() {
  const [select, setSelect] = useState(1)
  const [button1, setButton1] = useState(true)
  const [button2, setButton2] = useState(false)
  const [button3, setButton3] = useState(false)

  const handleSet = (value: number) => {
    setSelect(value)
    setButton1(1 === value)
    setButton2(2 === value)
    setButton3(2 === value)
  }

  const [menu, setMenu] = useState(false)
  const handleClickMenu = () => {
    setMenu(!menu)
    console.log('ok')
  }

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 768,
        lg: 1024,
        xl: 1280
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <div className=' ml-0 h-screen  '>
        <Header handleClickMenu={handleClickMenu} />

        <Box>
          <Drawer anchor={'left'} open={menu} onClose={handleClickMenu}>
            <Card />
            <SideBarList handleSet={handleSet} select={select} />
          </Drawer>
        </Box>

        {/* <SideBarMobile
          handleClick1={handleClick1}
          handleClick2={handleClick2}
          handleClickMenu={handleClickMenu}
          menu={menu}
        /> */}
        <div className='container mx-0 h-4/5 w-screen bg-white p-0 md:flex xl:mx-40'>
          <Box>
            <Card />
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <SideBarList handleSet={handleSet} select={select} />
            </Box>
          </Box>

          <div className='h-full w-full border-2 border-solid md:w-4/5'>
            {button1 && <Content />}
            {button2 && <ChangePassword />}
            {button3}
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}