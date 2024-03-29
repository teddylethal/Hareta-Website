import AdminProductGroupList from '../../components/AdminProductGroupList'
import AdminCreatingProductHeader from '../../components/AdminCreatingProductHeader'
import AdminCreateProductGroup from '../AdminCreateProductGroup/AdminCreateProductGroup'
import AdminCreateProduct from '../AdminCreatesProduct/AdminCreateProduct'

export default function AdminCreatingProductPage() {
  return (
    <div>
      <AdminCreatingProductHeader />
      <div className='mt-4 space-y-8'>
        <AdminCreateProductGroup />

        <AdminCreateProduct />
        <div className=''>
          <div className='col-span-1 space-y-4'>
            <AdminCreateProductGroup />
          </div>

          <div className='col-span-1'>
            <AdminProductGroupList />
          </div>
        </div>
      </div>
    </div>
  )
}
