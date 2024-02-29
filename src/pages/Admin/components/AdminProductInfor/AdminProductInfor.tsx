import { useQuery } from '@tanstack/react-query'
import DOMPurify from 'dompurify'
import { Fragment, useContext } from 'react'
import productApi from 'src/apis/product.api'
import LoadingRing from 'src/components/LoadingRing'
import { AdminContext } from 'src/contexts/admin.context'

function InforSection({ title, infor }: { title: string; infor: string | number }) {
  //! STYLES
  const wrapperClassname = 'grid grid-cols-12 items-center gap-4 text-lg'
  const titleWrapperClassname = 'col-span-2'
  const contentWrapperClassname = 'col-span-10'
  const titleClassname = ' font-medium uppercase text-white/60'
  const contentClassname = 'rounded-lg bg-darkColor900 px-2 py-1 capitalize text-haretaColor'

  return (
    <div className={wrapperClassname}>
      <div className={titleWrapperClassname}>
        <p className={titleClassname}>{title}</p>
      </div>
      <div className={contentWrapperClassname}>
        <div className={contentClassname}>{infor}</div>
      </div>
    </div>
  )
}

export default function AdminProductInfor() {
  const { currentProduct } = useContext(AdminContext)

  //! GET CURRENT PRODUCT DETAIL
  const productId = currentProduct?.id
  const { data: productDetailData } = useQuery({
    queryKey: ['admin_product_detail', productId],
    queryFn: () => productApi.getProductDetail(productId as string),
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(currentProduct)
  })
  const productDetail = productDetailData?.data.data
  const avatarURL = productDetail?.avatar ? productDetail.avatar.url : null

  //! STYLES
  const wrapperClassname = 'grid grid-cols-12 items-center gap-4 text-lg'
  const titleWrapperClassname = 'col-span-2'
  const contentWrapperClassname = 'col-span-10'
  const titleClassname = ' font-medium uppercase text-white/60'
  const contentClassname = 'rounded-lg bg-darkColor900 px-2 py-1 capitalize text-haretaColor'

  return (
    <div className='flex min-h-[200px] items-center justify-center rounded-lg border border-white/40 bg-black'>
      {!currentProduct && <div className='h-full text-xl font-semibold uppercase'>Hãy chọn một sản phẩm</div>}
      {currentProduct && (
        <Fragment>
          {!productDetail && <LoadingRing />}

          {productDetail && (
            <div className='space-y-4 px-2 py-4'>
              <div className={wrapperClassname}>
                <div className={titleWrapperClassname}>
                  <p className={titleClassname}>Ảnh đại diện</p>
                </div>
                <div className={contentWrapperClassname}>
                  <div className=' w-6/12 desktop:w-8/12'>
                    <div className='relative w-full overflow-hidden pt-[75%]'>
                      <img
                        src={avatarURL || ''}
                        alt={`${productDetail.name} ${productDetail.color}`}
                        className='absolute left-0 top-0 h-full w-full object-scale-down'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <InforSection title='Nhóm sản phẩm' infor={productDetail.group.name} />
              <InforSection title='ID' infor={productDetail.id} />
              <InforSection title='Tên sản phẩm' infor={productDetail.name} />
              <InforSection title='Màu' infor={productDetail.color} />
              <InforSection title='Hạng mục' infor={productDetail.category} />
              <InforSection title='Bộ sưu tập' infor={productDetail.collection} />
              <InforSection title='Loại' infor={productDetail.type} />
              <InforSection title='Dòng sản phẩm' infor={productDetail.product_line} />
              <InforSection title='Số lượng' infor={productDetail.quantity} />
              <InforSection title='Giá' infor={productDetail.price} />
              <InforSection title='Giảm giá' infor={productDetail.discount} />
              <InforSection title='Tag' infor={productDetail.tag} />
              <InforSection title='Lượt thích' infor={productDetail.like_count} />
              <InforSection title='Đã bán' infor={productDetail.sold} />
              <InforSection title='cron status' infor={productDetail.cron_status} />

              <div className='flex flex-col items-center space-y-2 text-lg'>
                <p className={titleClassname}>Mô tả</p>
                <div className={contentClassname}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(productDetail.description)
                    }}
                    className='overflow-visible'
                  />
                </div>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}
