import { ReactNode, useId, useState } from 'react'
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
  svgData?: ReactNode
  labelName: string
  required?: boolean
  isPasswordInput?: boolean
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
  svgData,
  autoComplete = 'off',
  required = false,
  isPasswordInput = false
}: Props) {
  const inputId = useId()
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <div className={className}>
      <div
        className={
          'relative mx-0 mt-6 h-12 w-full border-b-2 duration-500 ' +
          (errorMessage ? 'border-red-500 dark:border-red-600' : 'border-black dark:border-vintageColor')
        }
      >
        <span className='absolute right-2 top-1/2 -translate-y-1/2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='h-4 w-4 fill-black duration-300 dark:fill-vintageColor md:h-6 md:w-6'
          >
            {svgData}
          </svg>
        </span>
        {isPasswordInput && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div className='absolute right-8 top-1/2 translate-y-[-40%] md:right-10' onClick={() => setVisible(!visible)}>
            {visible && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-4 w-4 fill-black duration-300 dark:fill-vintageColor md:h-6 md:w-6'
              >
                <path d='M12 15a3 3 0 100-6 3 3 0 000 6z' />
                <path
                  fillRule='evenodd'
                  d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z'
                  clipRule='evenodd'
                />
              </svg>
            )}
            {!visible && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-4 w-4 fill-black duration-300 dark:fill-vintageColor md:h-6  md:w-6'
              >
                <path d='M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z' />
                <path d='M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z' />
                <path d='M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z' />
              </svg>
            )}
          </div>
        )}
        <input
          type={visible ? 'text' : `${type}`}
          id={inputId}
          className={
            'peer h-full w-full  border-none bg-transparent pl-1.5 text-lg text-[#222] outline-none duration-300 dark:text-textVintage dark:caret-white ' +
            (isPasswordInput ? 'pr-14 md:pr-20' : 'pr-9 md:pr-12')
          }
          autoComplete={autoComplete}
          required={required}
          {...register(name, rules)}
        />
        <label
          htmlFor={inputId}
          className='absolute left-1.5 top-1/2 -translate-y-1/2 cursor-text  select-none text-base text-[#666666] duration-300 peer-valid:top-[-5px] peer-valid:text-sm peer-focus:top-[-5px] peer-focus:text-sm dark:text-textVintage dark:text-opacity-80'
        >
          {labelName}
        </label>
      </div>
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}
