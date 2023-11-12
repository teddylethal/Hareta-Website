import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
import { getLanguageFromLS } from './utils'

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

const isEng = getLanguageFromLS() == 'en'
const handleEmailYup = () => {
  return yup
    .string()
    .required(isEng ? 'Email address is required' : 'Bạn cần phải điền địa chỉ email')
    .email(isEng ? 'Incorrect email format' : 'Địa chỉ email sai định dạng')
    .min(5, isEng ? 'Email address must have at least 5 characters' : 'Địa chỉ email phải có ít nhất 5 kí tự')
    .max(
      160,
      isEng
        ? 'Email address can only have a total length of 160 characters'
        : 'Địa chỉ email chỉ có thể bao gồm tối đa 160 kí tự'
    )
}

const handlePasswordYup = () => {
  return yup
    .string()
    .required(isEng ? 'Password is required' : 'Bận cần phải điền mật khẩu')
    .min(8, isEng ? 'Password must be 8-16 characters' : 'Mật khẩu phải bao gồm ít nhất 8 kí tự')
    .max(16, isEng ? 'Password must be 8-16 characters' : 'Mật khẩu phải bao gồm ít nhất 8 kí tự')
}
const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required(isEng ? 'Confirm Password is required' : 'Bạn cần phải nhập lại mật khẩu')
    .min(8, isEng ? 'Password must be 8-16 characters' : 'Mật khẩu phải bao gồm ít nhất 8 kí tự')
    .max(16, isEng ? 'Password must be 8-16 characters' : 'Mật khẩu phải bao gồm ít nhất 8 kí tự')
    .oneOf([yup.ref(refString)], isEng ? 'Passwords do not match' : 'Mật khẩu không khớp')
}

export const registerSchema = yup.object({
  email: handleEmailYup(),
  password: handlePasswordYup(),
  confirm_password: handleConfirmPasswordYup('password'),
  name: yup.string().required(isEng ? 'Name is required' : 'Bạn cần điền tên của mình'),
  phone: yup.string().required(isEng ? 'Phone number is required' : 'Bạn cần điền số điện thoại của mình')
})

export const loginSchema = yup.object({
  email: yup.string().required(isEng ? 'Email address is required' : 'Bạn cần phải điền địa chỉ email'),
  password: yup.string().required(isEng ? 'Password is required' : 'Bận cần phải điền mật khẩu')
})

export const requestVerifySchema = yup.object({
  email: handleEmailYup()
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
  lower_price: yup
    .string()
    .default('')
    .test({
      name: 'price-is-not-allowed',
      message: isEng ? 'Price range is not allowed' : 'Khoảng giá không hợp lệ',
      test: testPriceMinMax
    }),
  upper_price: yup
    .string()
    .default('')
    .test({
      name: 'price-is-not-allowed',
      message: isEng ? 'Price range is not allowed' : 'Khoảng giá không hợp lệ',
      test: testPriceMinMax
    })
})

export const userSchema = yup.object({
  name: yup
    .string()
    .default('')
    .max(160, isEng ? 'Maximum name length is 160 character' : 'Độ dài tối đa của tên là 160 kí tự'),
  phone: yup
    .string()
    .default('')
    .max(20, isEng ? 'Maximum phone number length is 20 characters' : 'Độ dài tối đa của số điện thoại là 20 kí tự'),
  avatar: yup
    .string()
    .default('')
    .max(1000, isEng ? 'Can not use this image' : 'Không thể sử dụng hình ảnh này')
})

export const changePasswordSchema = yup.object({
  old_password: yup.string().default(''),
  new_password: handlePasswordYup(),
  confirm_new_password: handleConfirmPasswordYup('new_password')
})

export const changePasswordRecoverySchema = yup.object({
  email: handleEmailYup(),
  new_password: handlePasswordYup(),
  confirm_new_password: handleConfirmPasswordYup('new_password')
})

export const orderSchema = yup.object({
  email: handleEmailYup(),
  name: yup.string().required(isEng ? 'Customer name is required' : 'Bạn cần điền tên người mua hàng'),
  phone: yup.string().required(isEng ? 'Phone number is required' : 'Bạn cần điền số điện thoại người mua hàng'),
  address: yup.string().required(isEng ? 'Address is required' : 'Bạn cần điền địa chỉ nhận hàng'),
  id: yup.array().of(yup.string()).required()
})
export type OrderSchema = yup.InferType<typeof orderSchema>

export const orderSchemaForGuest = yup.object({
  email: handleEmailYup(),
  name: yup.string().required(isEng ? 'Customer name is required' : 'Bạn cần điền tên người mua hàng'),
  phone: yup.string().required(isEng ? 'Phone number is required' : 'Bạn cần điền số điện thoại người mua hàng'),
  address: yup.string().required(isEng ? 'Address is required' : 'Bạn cần điền địa chỉ nhận hàng'),
  item: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.string().required(),
        quantity: yup.number().required()
      })
    )
    .required()
})
export type OrderSchemaForGuest = yup.InferType<typeof orderSchemaForGuest>

export type RegisterSchema = yup.InferType<typeof registerSchema>

export type LoginSchema = yup.InferType<typeof loginSchema>

export type RequestVerifySchema = yup.InferType<typeof requestVerifySchema>

export type ProductSchema = yup.InferType<typeof productSchema>

export type PriceSchema = yup.InferType<typeof priceSchema>

export type UserSchema = yup.InferType<typeof userSchema>

export type ChangePasswordSchema = yup.InferType<typeof changePasswordSchema>

export type ChangePasswordRecoverySchema = yup.InferType<typeof changePasswordRecoverySchema>
