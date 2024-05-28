import { Fragment, useContext, useEffect } from 'react'
import { AdminContext } from 'src/contexts/admin.context'
import { useQuery } from '@tanstack/react-query'
import productApi from 'src/apis/product.api'
import { Product, ProductListConfig } from 'src/types/product.type'
import classNames from 'classnames'
import LoadingRing from 'src/components/LoadingRing'

interface Props {
  wrapperClassname?: string
}

export default function AdminSelectsVariant({ wrapperClassname = 'm-2 grid grid-cols-3 gap-3' }: Props) {
  const { productGroup, currentProduct, setCurrentProduct, defaultProductIdList, setDefaultProductIdList } =
    useContext(AdminContext)

  //! Get product in group
  const {
    data: productsInGroupData,
    refetch,
    isFetching,
    isFetched
  } = useQuery({
    queryKey: ['admin', 'product-groups', productGroup?.id],
    queryFn: () =>
      productApi.getProductsInGroup({
        id: productGroup?.id as string,
        page: '1',
        limit: '50'
      }),
    enabled: Boolean(productGroup),
    staleTime: 1000 * 60 * 3
  })
  const productsInGroup = productsInGroupData?.data.data || []

  useEffect(() => {
    if (productGroup) {
      refetch()
    }
  }, [productGroup, refetch])

  //! Get default product list
  const queryConfig = {}
  const { data: defaultProductListData } = useQuery({
    queryKey: ['admin', 'default-products'],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    staleTime: 3 * 60 * 1000
  })
  const defaultProductList = defaultProductListData?.data.data

  useEffect(() => {
    if (defaultProductList) {
      setDefaultProductIdList(defaultProductList.map((p) => p.id))
    }
  }, [setDefaultProductIdList, defaultProductList])

  //! Select product
  const handleChooseVariant = (item: Product) => () => {
    setCurrentProduct(item)
  }

  return (
    <div className='relative rounded-lg border border-white/40 bg-black p-4'>
      <div className='flex w-full flex-col items-center justify-center space-y-4'>
        <p className='text-lg font-semibold uppercase desktop:text-xl'>Chọn sản phẩm</p>
        <div className='h-80 w-full overflow-scroll rounded-lg border border-white/40 bg-[#202020]'>
          {!productGroup && (
            <div className='inset-0 flex h-full w-full cursor-not-allowed items-center justify-center text-2xl uppercase'>
              Chọn 1 nhóm sản phẩm
            </div>
          )}
          {isFetching && (
            <div className='inset-0 flex h-full w-full items-center justify-center bg-black/50'>
              <LoadingRing />
            </div>
          )}
          {isFetched && (
            <Fragment>
              {productsInGroup.length == 0 && (
                <div className='flex h-full w-full items-center justify-center text-lg font-semibold text-alertRed'>
                  Nhóm này chưa có sản phẩm nào
                </div>
              )}
              {productsInGroup.length > 0 && (
                <div className={wrapperClassname}>
                  {productsInGroup.map((product, index) => {
                    const isActive = product.id === currentProduct?.id
                    const avatarURL = product.avatar ? product.avatar.url : null
                    return (
                      <div
                        key={index}
                        className={classNames(' col-span-1 h-min rounded-xl outline outline-1 outline-offset-0', {
                          'outline-2 outline-haretaColor': isActive,
                          'outline-haretaColor/40 ': !isActive
                        })}
                      >
                        <button className='w-full justify-center space-y-2 py-2' onClick={handleChooseVariant(product)}>
                          <div className='relative w-full pt-[75%]'>
                            <img
                              src={avatarURL || ''}
                              alt={`${product.name} ${product.color}`}
                              className='absolute left-0 top-0 h-full w-full object-scale-down'
                            />
                            {defaultProductIdList.includes(product.id) && (
                              <p className='absolute bottom-1 left-1/2 w-10/12 -translate-x-1/2 select-none rounded-md bg-primaryColor p-2 text-center text-sm uppercase text-lightText opacity-80'>
                                sp mặc định
                              </p>
                            )}
                          </div>
                          <p className='w-full text-center font-medium uppercase'>{product.color}</p>
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}
