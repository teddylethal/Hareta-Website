import { useState, useEffect } from 'react'
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

type Props = {
  handleSet: (value: number) => void
  select: number
}

export default function SideBarList({ handleSet, select }: Props) {
  const [color1, setColor1] = useState('blue')
  const [color2, setColor2] = useState('black')
  const [color3, setColor3] = useState('black')
  const [color4, setColor4] = useState('black')

  useEffect(() => {
    setColor1(1 === select ? 'blue' : 'black')
    setColor2(2 === select ? 'blue' : 'black')
    setColor3(3 === select ? 'blue' : 'black')
    setColor4(4 === select ? 'blue' : 'black')
  }, [select])

  const handleClick1 = () => {
    handleSet(1)
  }
  const handleClick2 = () => {
    handleSet(2)
  }
  const handleClick3 = () => {
    handleSet(3)
  }
  const handleClick4 = () => {
    handleSet(4)
  }
  return (
    <Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick1}>
            <ListItemText primary='General' sx={{ color: color1 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick2}>
            <ListItemText primary='Change your info' sx={{ color: color2 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick3}>
            <ListItemText primary='Change Password' sx={{ color: color3 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClick4}>
            <ListItemText primary='Order' sx={{ color: color4 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
