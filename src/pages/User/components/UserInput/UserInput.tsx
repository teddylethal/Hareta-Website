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
    ? 'w-4/5 rounded-sm border-2 border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm pointer-events-none'
    : 'w-4/5 rounded-sm border-2 border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'

  const registerResult = register(name, rules)
  return (
    <Box className={className}>
      <div className='flex items-end justify-start'>
        {icon}
        <div className='text-xl'>{title}</div>
      </div>
      <input className={classNameInput} {...registerResult} />
    </Box>
  )
}
