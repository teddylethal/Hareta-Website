import AdminItemGroup from '../../components/AdminItemGroup'
import { Fragment } from 'react'

export default function AdminItemPage() {
  //? GET ITEM GROUPS

  return (
    <Fragment>
      <div className='flex items-center justify-center rounded-xl border border-white/40 py-4'>
        <p className='text-lg font-medium uppercase text-textLight lg:text-3xl'>Create new item</p>
      </div>
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-8'></div>
        <div className='col-span-4'>
          <div className='py-4'>
            <AdminItemGroup />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
