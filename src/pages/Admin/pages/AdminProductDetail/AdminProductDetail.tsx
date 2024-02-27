import { useParams } from 'react-router-dom'
import { getIdFromNameId } from 'src/utils/utils'
import AdminVariantList from '../../components/AdminVariantList'
import { useContext } from 'react'
import { AdminContext } from '../../layouts/AdminMainLayout/AdminMainLayout'
import productApi from 'src/apis/product.api'
import { useQuery } from '@tanstack/react-query'
import LoadingSection from 'src/components/LoadingSection'

export default function AdminProductDetail() {
  const { setCurrentItem } = useContext(AdminContext)

  //! GET PRODUCT DETAIL
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['admin_product_detail', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const defaultProduct = productDetailData?.data.data

  return (
    <div>
      {!defaultProduct && <LoadingSection />}
      {defaultProduct && (
        <div className=''>
          <AdminVariantList groupId={defaultProduct.group.id} />
        </div>
      )}
    </div>
  )
}
