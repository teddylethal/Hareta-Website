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

export const schema = yup.object({
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
  confirm_password: yup
    .string()
    .required('Confirm Password is required')
    .min(8, 'Password must be 8-16 characters')
    .max(16, 'Password must be 8-16 characters')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone number is required')
})

export const loginSchema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required')
})

export const userSchema = yup.object({
  email: yup.string().required('Email is required'),
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone number is required')
})

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required('Old Password is required'),

  newPassword: yup.string().required('New Password is required'),

  confirmNewPassword: yup
    .string()
    .required('Confirm New Password is required')
    .oneOf([yup.ref('newPassword')], 'New Passwords do not match')
})

export type Schema = yup.InferType<typeof schema>

// export const loginSchema = schema.omit(['name', 'phone', 'confirm_password'])

export type LoginSchema = yup.InferType<typeof loginSchema>

export type UserSchema = yup.InferType<typeof userSchema>
export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>
