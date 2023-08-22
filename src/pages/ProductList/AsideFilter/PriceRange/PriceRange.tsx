import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { NoUndefinedField } from 'src/types/utils.type'
import { PriceSchema, priceSchema } from 'src/utils/rules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

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
    trigger
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

  return (
    <div className='ml-4 overflow-hidden rounded-lg bg-[#ddd] px-3 py-2 text-center duration-500 dark:bg-[#303030]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2 text-left text-base font-medium text-textDark duration-500 dark:text-textLight lg:text-lg'>
          <p className=' uppercase '>Price</p>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
      <form className='mx-2 my-1' onSubmit={onSubmit}>
        <div className='flex items-center justify-center'>
          {/* <Controller
            control={control}
            name='lower_price'
            render={({ field }) => {
              return (
                <InputNumber
                  type='text'
                  className='flex items-center'
                  placeholder='$ From'
                  classNameInput='p-1 text-center text-xs lg:text-sm outline-none rounded-sm focus:shadow-sm w-12 xl:w-20 lg:w-14'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('upper_price')
                  }}
                />
              )
            }}
          /> */}

          <div className='flex items-center'>
            <input
              className='w-12 rounded-md p-1 text-center text-xs outline-none focus:shadow-sm lg:w-14 lg:text-sm xl:w-20'
              placeholder='$ From'
              value={lowerPrice}
              {...register('lower_price')}
              onChange={handleChangeLowerPrice}
            />
          </div>

          <div className='m-2 text-textDark dark:text-textLight'>-</div>

          <div className='flex items-center'>
            <input
              className='w-12 rounded-md p-1 text-center text-xs outline-none focus:shadow-sm lg:w-14 lg:text-sm xl:w-20'
              placeholder='$ To'
              value={upperPrice}
              {...register('upper_price')}
              onChange={handleChangeUpperPrice}
            />
          </div>
          {/* {rerender && (
            <Controller
              control={control}
              name='upper_price'
              render={({ field }) => {
                return (
                  <InputNumber
                    type='text'
                    className='flex items-center'
                    placeholder='$ To'
                    classNameInput='p-1 text-xs text-center lg:text-sm outline-none rounded-md focus:shadow-sm w-12 xl:w-20 lg:w-14'
                    classNameError='hidden'
                    {...field}
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('lower_price')
                    }}
                  />
                )
              }}
            />
          )} */}
        </div>
        <div className='mt-1  text-center text-sm text-red-600'>{errors.lower_price?.message}</div>

        <div className='mt-2 flex items-center justify-center space-x-4'>
          {active && (
            <button
              className='dark:hover:outline-red-400r mt-1 rounded-md px-4  py-1 text-xs text-red-500/80 hover:text-red-500  hover:underline lg:text-sm xl:text-base'
              onClick={handleReset}
              type='button'
            >
              Reset
            </button>
          )}
          {!active && (
            <button className='dark:hover:outline-red-400r mt-1 cursor-not-allowed rounded-md px-4  py-1 text-xs text-red-500/40  lg:text-sm xl:text-base'>
              Reset
            </button>
          )}
          <button
            className='mt-1 rounded-md bg-[#fff] px-8  py-1 text-xs font-medium text-textDark hover:text-brownColor hover:outline hover:outline-1 hover:outline-brownColor dark:bg-[#101010] dark:text-textLight dark:hover:text-haretaColor dark:hover:outline-haretaColor lg:text-sm xl:text-base'
            type='submit'
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  )
}
