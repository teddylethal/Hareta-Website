import { Box } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  title: string
  content?: string
  className?: string
}
export default function UserInfo({ icon, title, content, className = '' }: Props) {
  return (
    <div className={className}>
      <div className='flex items-center'>
        {icon}
        <div className='ml-2 flex flex-col'>
          <div className='text-lg font-light'>{title}:</div>
          <div className='font-bold'>{content || '-'}</div>
        </div>
      </div>
    </div>
  )
}
