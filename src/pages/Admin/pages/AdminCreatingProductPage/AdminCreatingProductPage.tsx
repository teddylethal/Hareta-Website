import AdminProductGroupList from '../../components/AdminProductGroupList'
import AdminCreatingProductHeader from '../../components/AdminCreatingProductHeader'
import AdminCreatesProductGroup from './AdminCreatesProductGroup'
import AdminCreatesProduct from './AdminCreatesProduct'

export default function AdminCreatingProductPage() {
  return (
    <div>
      <AdminCreatingProductHeader />
      <div className='mt-4 space-y-8'>
        <AdminCreatesProductGroup />

        <AdminCreatesProduct />
        <div className=''>
          <div className='col-span-1 space-y-4'>
            <AdminCreatesProductGroup />
          </div>

          <div className='col-span-1'>
            <AdminProductGroupList />
          </div>
        </div>
      </div>
    </div>
  )
}
