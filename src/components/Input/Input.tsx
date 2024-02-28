import { Fragment, InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  inputClassName?: string
  errorClassName?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  name,
  register,
  className = 'bg-transparent',
  errorMessage,
  rules,
  inputClassName = 'w-full rounded-sm border border-gray-300 p-3 outline-none outline',
  errorClassName = 'mt-1 min-h-[1.25rem] lg:min-h-[1.5rem] text-sm lg:text-base text-red-600',
  ...rest
}: Props) {
  //? handle errors
  const { t } = useTranslation('yuperrors')
  let message = ''
  switch (errorMessage) {
    case 'Customer name is required':
      message = t('order.Customer name is required')
      break
    case 'Customer phone number is required':
      message = t('order.Customer phone number is required')
      break
    case 'Email address is required':
      message = t('order.Customer email address is required')
      break
    case 'Address is required':
      message = t('order.Address is required')
      break
    default:
      message = errorMessage as string
      break
  }

  const registerResult = register && name ? register(name, rules) : {}
  return (
    <Fragment>
      <div className={className}>
        <input className={inputClassName} {...registerResult} {...rest} />
      </div>
      <div className={errorClassName}>{message}</div>
    </Fragment>
  )
}
