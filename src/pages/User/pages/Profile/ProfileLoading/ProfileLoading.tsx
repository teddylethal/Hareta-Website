import { Skeleton } from '@mui/material'

export default function ProfileLoading() {
  return (
    <div className='relative mx-2 my-12 rounded-lg bg-lightBg p-2 dark:bg-darkBg lg:mx-8 lg:my-16 lg:p-4'>
      <div className='relative -top-4 flex items-center justify-between lg:-top-10'>
        <div className='flex w-full items-center'>
          <div className='relative h-20 w-20 overflow-hidden rounded-full border-[5px] border-[#f8f8f8] dark:border-[#181818] lg:h-32 lg:w-32'>
            <Skeleton
              variant='rounded'
              className='absolute left-0 top-0 object-cover dark:bg-white/10'
              width={'100%'}
              height={'100%'}
            />
          </div>

          <div className='ml-2 flex grow flex-col space-y-1 sm:ml-4 lg:ml-8'>
            <Skeleton width={'50%'} height={40} className=' dark:bg-white/10' />
            <p className='truncate text-xs text-textDark/60 dark:text-textLight/60 sm:text-sm lg:text-base'>
              <Skeleton className=' dark:bg-white/10' width={'20%'} />
            </p>
          </div>
        </div>
      </div>

      <div className='space-y-2 rounded-lg bg-[#e8e8e8] px-6 py-4 dark:bg-[#202020] '>
        <div className=''>
          <p className=' text-base uppercase text-textDark/60 dark:text-textLight/60 lg:text-lg'>Name</p>
          <div>
            <Skeleton width={'50%'} height={40} className=' dark:bg-white/10' />
            <div className='mt-1 min-h-[1.25rem]'></div>
          </div>
        </div>
        <div className=''>
          <p className=' text-base uppercase text-textDark/60 dark:text-textLight/60 lg:text-lg'>Phone number</p>
          <div>
            <Skeleton width={'50%'} height={40} className=' dark:bg-white/10' />
            <div className='mt-1 min-h-[1.25rem]'></div>
          </div>
        </div>
        <div className=''>
          <p className=' text-base uppercase text-textDark/60 dark:text-textLight/60 lg:text-lg'>email</p>
          <Skeleton width={'50%'} height={40} className=' dark:bg-white/10' />
        </div>
      </div>
    </div>
  )
}
