import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Incorrect email format'
    },
    maxLength: {
      value: 160,
      message: 'Email address can only have a total length of 160 characters'
    },
    minLength: {
      value: 5,
      message: 'Email address must have at least 5 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    minLength: {
      value: 8,
      message: 'Password must be 8-16 characters'
    },
    maxLength: {
      value: 16,
      message: 'Password must be 8-16 characters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Confirm password is required'
    },
    minLength: {
      value: 8,
      message: 'Password must be 8-16 characters'
    },
    maxLength: {
      value: 16,
      message: 'Password must be 8-16 characters'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Passwords do not match'
        : undefined
  }
})

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Confirm Password is required')
    .min(8, 'Password must be 8-16 characters')
    .max(16, 'Password must be 8-16 characters')
    .oneOf([yup.ref(refString)], 'Passwords do not match')
}

export const registerSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Incorrect email format')
    .min(5, 'Email address must have at least 5 characters')
    .max(160, 'Email address can only have a total length of 160 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be 8-16 characters')
    .max(16, 'Password must be 8-16 characters'),
  confirm_password: handleConfirmPasswordYup('password'),
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone number is required')
})

export const loginSchema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required')
})

export const requestVerifySchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Incorrect email format')
    .min(5, 'Email address must have at least 5 characters')
    .max(160, 'Email address can only have a total length of 160 characters')
})

export const productSchema = yup.object({
  name: yup.string().trim().default('')
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { lower_price, upper_price } = this.parent as { lower_price: string; upper_price: string }
  if (lower_price !== '' && upper_price !== '') {
    return Number(upper_price) >= Number(lower_price)
  }
  return true
}

export const priceSchema = yup.object({
  lower_price: yup.string().default('').test({
    name: 'price-is-not-allowed',
    message: 'Price is not allowed',
    test: testPriceMinMax
  }),
  upper_price: yup.string().default('').test({
    name: 'price-is-not-allowed',
    message: 'Price is not allowed',
    test: testPriceMinMax
  })
})

export const userSchema = yup.object({
  name: yup.string().default('').max(160, 'Maximum name lenght is 160 character'),
  phone: yup.string().default('').max(20, 'Maximum phone number length is 20 characters'),
  avatar: yup.string().default('').max(1000, 'Maximum lenght is 1000 characters')
})

export const changePasswordSchema = yup.object({
  old_password: yup.string().default(''),
  new_password: yup
    .string()
    .default('')
    .min(8, 'Password must be 8-16 characters')
    .max(16, 'Password must be 8-16 characters'),
  confirm_new_password: handleConfirmPasswordYup('new_password')
})

export type RegisterSchema = yup.InferType<typeof registerSchema>

export type LoginSchema = yup.InferType<typeof loginSchema>

export type RequestVerifySchema = yup.InferType<typeof requestVerifySchema>

export type ProductSchema = yup.InferType<typeof productSchema>

export type PriceSchema = yup.InferType<typeof priceSchema>

export type UserSchema = yup.InferType<typeof userSchema>

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>
