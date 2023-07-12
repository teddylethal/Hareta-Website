import Info from 'src/components/UserProfileComponents/Info'

export default function Content() {
  return (
    <div className='border-box flex h-full flex-col'>
      <div className='ml-5 flex h-1/6 w-full items-center text-2xl'> Thông tin cá nhân</div>
      <Info />
    </div>
  )
}
