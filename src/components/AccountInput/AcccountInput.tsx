import { ReactNode, useId, useState } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  notifyMessage?: string
  placeholder?: string
  className?: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
  svgData?: ReactNode
  labelName: string
  required?: boolean
  isPasswordInput?: boolean
  disabled?: boolean
}

export default function AccountInput({
  name,
  register,
  type,
  className,
  errorMessage,
  notifyMessage,
  rules,
  labelName,
  svgData,
  autoComplete = 'off',
  required = false,
  isPasswordInput = false,
  disabled = false
}: Props) {
  const inputId = useId()
  const [visible, setVisible] = useState<boolean>(false)

  //? handle error message
  const { t } = useTranslation('yuperrors')
  let message = ''
  switch (errorMessage) {
    case 'email or password is invalid':
      message = t('login.email or password is invalid')
      break
    case 'Email address is required':
      message = t('email.Email address is required')
      break
    case 'Incorrect email format':
      message = t('email.Incorrect email format')
      break
    case 'Email address must have at least 5 characters':
      message = t('email.Email address must have at least 5 characters')
      break
    case 'Email address can only have a total length of 160 characters':
      message = t('email.Email address can only have a total length of 160 characters')
      break
    case 'Password is required':
      message = t('password.Password is required')
      break
    case 'Confirm Password is required':
      message = t('password.Confirm Password is required')
      break
    case 'Password must be 8-16 characters':
      message = t('password.Password must be 8-16 characters')
      break
    case 'Passwords do not match':
      message = t('password.Passwords do not match')
      break
    case 'Name is required':
      message = t('register.Name is required')
      break
    case 'Phone number is required':
      message = t('register.Phone number is required')
      break
    case 'Price range is not allowed':
      message = t('price.Price range is not allowed')
      break
    case 'Maximum name length is 160 character':
      message = t('user.Maximum name length is 160 character')
      break
    case 'Maximum phone number length is 20 characters':
      message = t('user.Maximum phone number length is 20 characters')
      break
    case 'Can not use this image':
      message = t('user.Can not use this image')
      break
    case 'Customer name is required':
      message = t('order.Customer name is required')
      break
    case 'Customer phone number is required':
      message = t('order.Customer phone number is required')
      break
    case 'Address is required':
      message = t('order.Address is required')
      break

    default:
      break
  }
  return (
    <div className={className}>
      <div
        className={
          'relative mx-0 mt-6 h-12 w-full border-b-2 duration-300 ' +
          (errorMessage ? 'border-red-500 dark:border-red-600' : 'border-haretaColor dark:border-haretaColor')
        }
      >
        <span className='absolute right-2 top-1/2 -translate-y-1/2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='h-4 w-4 fill-haretaColor duration-300 dark:fill-haretaColor md:h-6 md:w-6'
          >
            {svgData}
          </svg>
        </span>
        {isPasswordInput && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className='absolute right-8 top-1/2 translate-y-[-40%] hover:cursor-pointer md:right-10'
            onClick={() => setVisible(!visible)}
          >
            {visible && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-4 w-4 fill-haretaColor dark:fill-haretaColor md:h-6 md:w-6'
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
                className='h-4 w-4 fill-haretaColor/60 hover:fill-haretaColor md:h-6 md:w-6'
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
            'peer h-full w-full border-none bg-transparent text-lg text-haretaColor outline-none duration-300 autofill:text-textDark disabled:text-brownColor dark:text-haretaColor dark:caret-haretaColor autofill:dark:text-haretaColor dark:disabled:text-haretaColor ' +
            (isPasswordInput ? 'pr-14 md:pr-20' : 'pr-9 md:pr-12')
          }
          disabled={disabled}
          autoComplete={autoComplete}
          required={required}
          {...register(name, rules)}
        />
        <label
          htmlFor={inputId}
          className='absolute left-0 top-1/2 -translate-y-1/2 cursor-text select-none text-base font-medium text-[#666666] duration-300 peer-valid:top-[-5px] peer-valid:text-sm peer-focus:top-[-5px] peer-focus:text-sm peer-disabled:top-[-5px] peer-disabled:text-sm dark:text-textVintage dark:text-opacity-80'
        >
          {labelName}
        </label>
      </div>
      <div className={'mt-1 min-h-[1.25rem] text-sm text-red-600 ' + (notifyMessage ? 'hidden' : '')}>{message}</div>
      <div className={'mt-1 min-h-[1.25rem] text-sm text-blue-600 ' + (!notifyMessage ? 'hidden' : '')}>
        {notifyMessage}
      </div>
    </div>
  )
}
