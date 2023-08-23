import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { NoUndefinedField } from 'src/types/utils.type'
import { PriceSchema, priceSchema } from 'src/utils/rules'
import classNames from 'classnames'
import PriceSample from './PriceSample'
import { priceRanges } from './priceRangeSample'

interface Props {
  queryConfig: QueryConfig

  // isMobile?: boolean
  // setMobileFilterOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

type FormData = NoUndefinedField<PriceSchema>
export default function PriceRange({ queryConfig }: Props) {
  const { lower_price, upper_price } = queryConfig

  const [lowerPrice, setLowerPrice] = useState<string>(lower_price || '')
  const [upperPrice, setUpperPrice] = useState<string>(upper_price || '')

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
    trigger,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      lower_price: '',
      upper_price: ''
    },
    resolver: yupResolver(priceSchema),
    shouldFocusError: false
  })

  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    let searchParams = createSearchParams(
      omit(
        {
          ...queryConfig,
          lower_price: data.lower_price as string,
          upper_price: data.upper_price as string
        },
        ['page', 'limit', 'limit']
      )
    )
    if (data.lower_price === '' && data.upper_price === '') {
      return
    } else if (data.lower_price === '') {
      searchParams = createSearchParams(
        omit(
          {
            ...queryConfig,
            upper_price: data.upper_price as string
          },
          ['lower_price', 'page', 'limit']
        )
      )
    } else if (data.upper_price === '') {
      searchParams = createSearchParams(
        omit(
          {
            ...queryConfig,
            lower_price: data.lower_price as string
          },
          ['upper_price', 'page', 'limit']
        )
      )
    }
    navigate({
      pathname: path.store,
      search: searchParams.toString()
    })
  })

  const active = lower_price || upper_price
  const notAllowApply = lowerPrice === '' && upperPrice === ''
  const handleReset = () => {
    setLowerPrice('')
    setUpperPrice('')
    reset()
    navigate({
      pathname: path.store
    })
  }

  const handleChangeLowerPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      setLowerPrice(value)
    }
    trigger('upper_price')
  }

  const handleChangeUpperPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      setUpperPrice(value)
    }
    trigger('lower_price')
  }

  const handleChoosePrice = (index: number) => {
    const priceRange = priceRanges[index]
    setLowerPrice(priceRange.lowerPrice.toString())
    setUpperPrice(priceRange.upperPrice.toString())
    setValue('lower_price', priceRange.lowerPrice.toString())
    setValue('upper_price', priceRange.upperPrice.toString())
    const searchParams = createSearchParams(
      omit(
        {
          ...queryConfig,
          lower_price: priceRange.lowerPrice.toString(),
          upper_price: priceRange.upperPrice.toString()
        },
        ['page', 'limit', 'limit']
      )
    )
    navigate({
      pathname: path.store,
      search: searchParams.toString()
    })
  }

  return (
    <div className='relative ml-4 rounded-lg bg-[#f8f8f8] px-3 py-2 text-center duration-500 dark:bg-[#303030]'>
      <PriceSample handleChoosePrice={handleChoosePrice} />
      {active && (
        <button
          className={classNames(
            'absolute right-0 top-0  mt-1 rounded-md px-4 py-1 text-xs text-red-500/80 duration-500 hover:text-red-500 hover:underline dark:hover:outline-red-400 lg:text-sm xl:text-base'
          )}
          onClick={handleReset}
          type='button'
        >
          Reset
        </button>
      )}
      <form className='mx-2 my-1' onSubmit={onSubmit}>
        <div className='flex items-center justify-center'>
          <div className='flex items-center'>
            <input
              className='w-12 rounded-md bg-white p-1 text-center text-xs text-textDark outline outline-1 outline-black/40 duration-500 focus:shadow-sm dark:bg-black dark:text-textLight dark:outline-white/40 lg:w-14 lg:text-sm xl:w-20'
              placeholder='$ From'
              value={lowerPrice}
              {...register('lower_price')}
              onChange={handleChangeLowerPrice}
            />
          </div>

          <div className='m-2 text-textDark duration-500 dark:text-textLight'>-</div>

          <div className='flex items-center'>
            <input
              className='w-12 rounded-md bg-white p-1 text-center text-xs text-textDark outline outline-1 outline-black/40 duration-500 focus:shadow-sm dark:bg-black dark:text-textLight dark:outline-white/40 lg:w-14 lg:text-sm xl:w-20'
              placeholder='$ To'
              value={upperPrice}
              {...register('upper_price')}
              onChange={handleChangeUpperPrice}
            />
          </div>
        </div>
        <div className='mt-1  text-center text-sm text-red-600'>{errors.lower_price?.message}</div>

        <div className='mt-2 flex items-center justify-center space-x-4'>
          <button
            disabled={notAllowApply}
            className={classNames(
              'mt-1 rounded-md bg-white px-8 py-1 text-xs font-medium text-textDark outline outline-1 duration-500 dark:bg-[#101010] dark:text-textLight  lg:text-sm xl:text-base',
              {
                'hover:text-brownColor hover:outline-brownColor dark:hover:text-haretaColor dark:hover:outline-haretaColor':
                  !notAllowApply,
                'cursor-not-allowed bg-opacity-30 text-opacity-30 dark:bg-opacity-50 dark:text-opacity-30':
                  notAllowApply
              }
            )}
            type='submit'
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  )
}
