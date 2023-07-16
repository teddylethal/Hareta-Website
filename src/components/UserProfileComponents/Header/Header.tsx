import Button from '@mui/material/Button'

type Props = {
  handleClickMenu: () => void
}

export default function Header({ handleClickMenu }: Props) {
  return (
    <div className='h-36'>
      <Button onClick={handleClickMenu}>Menu</Button>
    </div>
  )
}
