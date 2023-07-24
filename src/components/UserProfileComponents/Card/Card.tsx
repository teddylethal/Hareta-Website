import Avatar from '@mui/material/Avatar'
export default function Card() {
  return (
    <div className='mt-5 flex h-28 w-full flex-col items-center justify-end xl:flex-row'>
      <div className='h-1/2 xl:h-full '>
        <Avatar
          alt='avatar'
          src='https://thumbs.dreamstime.com/b/cartoon-monster-face-square-avatar-97161029.jpg'
          sx={{ width: { xl: 80, xs: 60 }, height: { xl: 80, xs: 60 } }}
        />
      </div>
      <div className='mt-2 h-1/2'>
        <h1>Bùi Trọng Văn</h1>
      </div>
    </div>
  )
}
