import { Skeleton } from '@mui/material'

export default function ProductDetailSkeleton() {
  return (
    <div className='rounded-lg border border-black/20 bg-[#dfdfdf] p-4 shadow dark:border-white/20 dark:bg-[#202020]'>
      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-5'>
          <div className='rounded-md bg-[#f8f8f8] p-4 dark:bg-[#101010]'>
            <div className='relative w-full overflow-hidden  pt-[100%]'>
              <Skeleton
                variant='rounded'
                className='absolute left-0 top-0 dark:bg-white/10'
                width={'100%'}
                height={'100%'}
              />
            </div>
            <div className='relative mt-3 flex justify-center space-x-2'>
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
        </div>

        <div className='relative col-span-7 flex min-h-full flex-col rounded-md bg-[#f8f8f8] p-6 text-textDark dark:bg-[#101010] dark:text-textLight'>
          <div className='flex w-full items-center justify-between text-2xl'>
            <Skeleton width={'50%'} height={40} className=' dark:bg-white/10' />

            <Skeleton variant='circular' className=' dark:bg-white/10' width={40} height={40} />
          </div>

          <div className='mt-4 flex items-center space-x-8 text-lg'>
            <Skeleton className=' dark:bg-white/10' width={'20%'} />

            <Skeleton className=' dark:bg-white/10' width={'20%'} />
          </div>
          <div className='mt-4'>
            <Skeleton variant='rounded' className=' dark:bg-white/10' width={'20%'} />
          </div>
          <div className='mt-8 h-full'>
            <Skeleton variant='rounded' className=' dark:bg-white/10' height={'100%'} />
          </div>
        </div>
      </div>
    </div>
  )
}
