import { ReactNode, useId } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

// interface Props {
//   type: React.HTMLInputTypeAttribute
//   errorMessage?: string
//   placeholder?: string
//   className?: string
//   name: string
//   register: UseFormRegister<any>
//   rules?: RegisterOptions
//   autoComplete?: string
// }

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
  pathData?: ReactNode
  labelName: string
  required?: boolean
}

// export default function Input({
//   name,
//   register,
//   type,
//   className,
//   errorMessage,
//   placeholder,
//   rules,
//   autoComplete
// }: Props) {
//   return (
//     <div className={className}>
//       {/* <label className='text-{500} text-{#000000} translate-y-{-100%} pointer-events-none absolute left-1.5 top-1/2 text-xs'>
//         {labelName}
//       </label> */}
//       <input
//         type={type}
//         className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
//         placeholder={placeholder}
//         autoComplete={autoComplete}
//         {...register(name, rules)}
//       />
//       <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
//     </div>
//   )
// }

export default function Input({
  name,
  register,
  type,
  className,
  errorMessage,
  rules,
  labelName,
  pathData,
  autoComplete = 'off',
  required = false
}: Props) {
  const inputId = useId()

  return (
    <div className={className}>
      <div
        className={
          'group relative mx-0 mt-6 h-12 w-full border-b-2 ' + (errorMessage ? 'border-red-500' : 'border-black')
        }
      >
        <span className='absolute right-2 top-1/2 -translate-y-1/2 fill-red-500 text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='black'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            {pathData}
          </svg>
        </span>
        <input
          type={type}
          id={inputId}
          className='peer h-full w-full border-none bg-transparent pl-1.5 pr-[35px] text-lg outline-none'
          autoComplete={autoComplete}
          required={required}
          {...register(name, rules)}
        />
        <label
          htmlFor={inputId}
          className='absolute left-1.5 top-1/2 -translate-y-1/2 cursor-text  select-none text-lg text-[#666666] duration-300 peer-valid:top-[-5px] peer-focus:top-[-5px] '
        >
          {labelName}
        </label>
      </div>
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}
