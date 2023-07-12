import Card from 'src/components/UserProfileComponents/Card'
import SideBarList from '../SideBarList'
import * as React from 'react'

import Drawer from '@mui/material/Drawer'

type Props = {
  handleClick1: () => void
  handleClick2: () => void
  handleClickMenu: () => void
  menu: boolean
}

export default function SideBarMobile({ handleClick1, handleClick2, handleClickMenu, menu }: Props) {
  return (
    <Drawer anchor={'left'} open={menu} onClose={handleClickMenu}>
      <Card />
      <SideBarList handleClick1={handleClick1} handleClick2={handleClick2} />
    </Drawer>
  )
}
