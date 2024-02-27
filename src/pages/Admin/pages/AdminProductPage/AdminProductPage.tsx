import { useParams } from 'react-router-dom'
import { getIdFromNameId } from 'src/utils/utils'
import { useContext, useEffect } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import productApi from 'src/apis/product.api'
import { useQuery } from '@tanstack/react-query'
import LoadingSection from 'src/components/LoadingSection'
import AdminSelectsVariant from '../../components/AdminSelectsVariant'
import AdminProductInfor from '../../components/AdminProductInfor'

export default function AdminProductPage() {
  const { setProductGroupId } = useContext(AdminContext)

  //! GET PRODUCT DETAIL
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['admin_product_detail', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const defaultProduct = productDetailData?.data.data

  useEffect(() => {
    if (defaultProduct) {
      setProductGroupId(defaultProduct.group.id)
    }
  }, [defaultProduct, setProductGroupId])

  return (
    <div>
      {!defaultProduct && <LoadingSection />}
      {defaultProduct && (
        <div className=''>
          <AdminSelectsVariant />

          <AdminProductInfor />
        </div>
      )}
    </div>
  )
}
