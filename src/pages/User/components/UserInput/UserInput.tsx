import { Box } from '@mui/material'
import { InputHTMLAttributes, ReactNode } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  className?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  name: string
  rules?: RegisterOptions
  icon: ReactNode
  title: string
  disabled?: boolean
}

export default function UserInput({ errorMessage, className, register, name, rules, icon, title, disabled }: Props) {
  const classNameInput = disabled
    ? 'w-full text-lg rounded border-0 border-black px-4 py-3 text-gray-700 shadow-sm outline outline-2 focus:outline-[3px] focus:outline-blue-600 pointer-events-none'
    : 'w-full text-lg rounded border-0 border-black px-4 py-3 text-gray-700 shadow-sm outline outline-2 focus:outline-[3px] focus:outline-blue-600'

  const registerResult = register(name, rules)
  return (
    <Box className={className}>
      <div className='flex items-center justify-start'>
        {icon}
        <div className='ml-3 text-2xl'>{title}</div>
      </div>
      <input className={classNameInput} {...registerResult} />
      <div className='h-6 text-sm text-red-600'>{errorMessage}</div>
    </Box>
  )
}
