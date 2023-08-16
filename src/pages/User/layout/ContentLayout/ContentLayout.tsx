import { ReactNode } from 'react'

interface Props {
  title: string
  subtitle: string
  content: ReactNode
}

export default function ContentLayout({ title, subtitle, content }: Props) {
  return (
    <div className='round-sm pl-10 shadow'>
      <div className='border-b border-b-gray-200 pb-10'>
        <h1 className='text-4xl font-bold'>{title}</h1>
        <h1 className='pt-2'>{subtitle}</h1>
      </div>
      <div className='h-[480px] py-5'>{content}</div>
    </div>
  )
}
