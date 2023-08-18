import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import InputNumber from 'src/components/InputNumber'
import InputV2 from 'src/components/InputV2'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { NoUndefinedField } from 'src/types/utils.type'
import { PriceSchema, priceSchema } from 'src/utils/rules'

interface Props {
  queryConfig: QueryConfig

  // isMobile?: boolean
  // setMobileFilterOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

type FormData = NoUndefinedField<PriceSchema>
export default function PriceRange({ queryConfig }: Props) {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors }
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
        ['page', 'limit']
      )
    )
    if (data.lower_price === '' && data.upper_price === '') {
      searchParams = createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['lower_price', 'upper_price', 'page']
        )
      )
    } else if (data.lower_price === '') {
      searchParams = createSearchParams(
        omit(
          {
            ...queryConfig,
            upper_price: data.upper_price as string
          },
          ['lower_price', 'page']
        )
      )
    } else if (data.upper_price === '') {
      searchParams = createSearchParams(
        omit(
          {
            ...queryConfig,
            lower_price: data.lower_price as string
          },
          ['upper_price', 'page']
        )
      )
    }
    navigate({
      pathname: path.store,
      search: searchParams.toString()
    })
  })

  return (
    <div className='ml-4 overflow-hidden rounded-lg bg-[#ddd] p-2 text-center duration-500 dark:bg-[#303030]'>
      <p className='text-lg text-textDark duration-500 dark:text-textLight'>Price range</p>
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
          <InputV2
            control={control}
            name='lower_price'
            type='number'
            className='flex items-center'
            placeholder='$ From'
            classNameInput='p-1 text-center text-xs lg:text-sm outline-none rounded-md focus:shadow-sm w-12 xl:w-20 lg:w-14'
            classNameError='hidden'
            onChange={() => {
              trigger('upper_price')
            }}
          />
          <div className='m-2 text-textDark dark:text-textLight'>-</div>
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
                    trigger('upper_price')
                  }}
                />
              )
            }}
          />
        </div>
        <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'>{errors.lower_price?.message}</div>
        <button className='mt-1 w-[80%] rounded-md bg-[#fff] px-2 py-1 text-xs font-medium text-textDark hover:text-brownColor hover:outline hover:outline-1 hover:outline-brownColor dark:bg-[#101010] dark:text-textLight dark:hover:text-haretaColor dark:hover:outline-haretaColor lg:text-sm xl:text-base'>
          Apply
        </button>
      </form>
    </div>
  )
}
