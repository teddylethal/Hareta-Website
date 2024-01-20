import { Skeleton } from '@mui/material'
import { Fragment } from 'react'
import { useViewport } from 'src/hooks/useViewport'

export default function ProductDetailSkeleton() {
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768
  return (
    <Fragment>
      {!isMobile && (
        <div className='relative grid grid-cols-12 gap-4 lg:gap-8 xl:gap-16'>
          <div className='col-span-4'>
            <div className='sticky left-0 top-12 flex-col rounded-xl bg-lightWhite700 p-6 text-textDark dark:bg-darkGray700 dark:text-textLight md:top-14 lg:top-20'>
              <div className='flex items-center justify-between'>
                <p className='w-full text-xl font-medium lg:text-2xl xl:text-3xl'>
                  <Skeleton variant='rounded' className=' dark:bg-white/10' width={'60%'} />
                </p>
              </div>

              <div className='mt-2'>
                <span className='text-base font-medium lg:text-lg xl:text-xl'>
                  <Skeleton variant='rounded' className=' dark:bg-white/10' width={'20%'} />
                </span>
              </div>

              <div className='mt-8 w-full rounded-lg border border-black/20 p-4 dark:border-white/20'>
                <div className='flex items-center justify-between'>
                  <p className='w-full text-base font-medium lg:text-lg xl:text-xl'>
                    <Skeleton variant='rounded' className=' dark:bg-white/10' width={'20%'} />
                  </p>
                  <p className='text-sm text-textDark/60 dark:text-textLight/60 lg:text-base '>
                    <Skeleton variant='rounded' className=' dark:bg-white/10' width={'20%'} />
                  </p>
                </div>
                <div className='max-h-64 w-full overflow-auto py-4'>
                  <div className='grid w-full grid-cols-3 gap-4'>
                    {Array(9)
                      .fill(0)
                      .map((_, index) => {
                        return (
                          <div key={index} className='col-span-1 rounded-xl'>
                            <div className='relative w-full pt-[100%]'>
                              <Skeleton
                                className='absolute left-0 top-0 dark:bg-white/10'
                                variant='rounded'
                                width={'100%'}
                                height={'100%'}
                              />
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>

              <div className='w-full'>
                <div className='mt-6 flex items-center justify-between text-xs lg:text-sm xl:text-base'>
                  <div className='flex items-center space-x-2'>
                    <p className='text-textDark dark:text-textLight'>Quantity:</p>
                    <Skeleton variant='rounded' className=' dark:bg-white/10' width={'20%'} />
                  </div>
                  <div className='flex items-center space-x-1 text-textDark/60 dark:text-textLight/60'>
                    <Skeleton variant='rounded' className=' dark:bg-white/10' width={'20%'} />
                  </div>
                </div>

                <div className='mt-4 flex justify-between'>
                  <Skeleton variant='rounded' className=' dark:bg-white/10' width={'20%'} />

                  <Skeleton variant='rounded' className=' dark:bg-white/10' width={'20%'} />
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-8'>
            <div className='relative'>
              <div className='relative w-full cursor-zoom-in overflow-hidden rounded-xl border border-black/10 pt-[75%] dark:border-white/10 '>
                <Skeleton
                  className='absolute left-0 top-0 dark:bg-white/10'
                  variant='rounded'
                  width={'100%'}
                  height={'100%'}
                />
              </div>
            </div>
            <div className='h-80'></div>
          </div>
        </div>
      )}
      {isMobile && (
        <Fragment>
          <div className='bg-lightBg dark:bg-darkBg'>
            <div className=' bg-[#f8f8f8] p-2 dark:bg-[#202020]'>
              <div className='relative w-full cursor-zoom-in overflow-hidden bg-[#dfdfdf] pt-[75%] dark:bg-[#101010]'>
                <Skeleton
                  variant='rounded'
                  className='absolute left-0 top-0 dark:bg-white/10'
                  width={'100%'}
                  height={'100%'}
                />
              </div>
              <div className='relative mt-3 flex select-none justify-center space-x-2'>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div className='relative w-[20%]  pt-[20%]' key={index}>
                      <Skeleton
                        className='absolute left-0 top-0 dark:bg-white/10'
                        variant='rounded'
                        width={'100%'}
                        height={'100%'}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className='relative flex flex-col bg-[#f8f8f8] px-4 py-3 text-textDark dark:bg-[#202020] dark:text-textLight'>
              <Skeleton variant='rounded' className=' dark:bg-white/10' width={'20%'} />
              <div className='mt-4 flex items-center justify-between'>
                <Skeleton width={'50%'} height={40} className=' dark:bg-white/10' />
              </div>

              <div className='mt-4 h-full text-sm lg:text-lg'>
                <Skeleton variant='rounded' className=' dark:bg-white/10' height={'100%'} />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}
