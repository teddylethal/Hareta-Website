import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { adminProductApi } from 'src/apis/admin.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { AdminContext } from 'src/contexts/admin.context'
import { Product } from 'src/types/product.type'
import { useNavigate } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { ErrorRespone } from 'src/types/utils.type'
import productApi from 'src/apis/product.api'
import AdminCreatingProductHeader from '../../components/AdminCreatingProductHeader'
import AdminProductGroupList from '../../components/AdminProductGroupList'
import AdminCreateProductForm from '../../components/AdminCreateProductForm'
import { CreateProductSchema, createProductSchema } from '../../../../rules/adminproduct.rule'

type FormData = CreateProductSchema

export default function AdminCreateProduct() {
  const { setLoadingPage } = useContext(AppContext)
  const { productGroup, setCurrentProduct } = useContext(AdminContext)

  //! Get product in group
  const { data: productsInGroupData } = useQuery({
    queryKey: ['admin', 'product_groups', 'products', productGroup],
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

  //! CREATE NEW ITEM
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',

      group_id: '',
      category: '',
      price: 10,
      description: '',
      collection: '',
      type: '',
      quantity: 1,
      product_line: '',
      color: ''
    },
    resolver: yupResolver(createProductSchema)
  })
  const { handleSubmit } = methods

  const createNewProductMutation = useMutation({ mutationFn: adminProductApi.createNewProduct })
  const setDefaultProductMutation = useMutation({ mutationFn: adminProductApi.setDefaultProduct })

  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (errors: any) => console.error(errors)
  const onSubmit = async (data: FormData) => {
    setLoadingPage(true)

    try {
      const newProductRespone = await createNewProductMutation.mutateAsync({ ...data })
      const newItem: Product = newProductRespone.data.data
      setCurrentProduct(newItem)
      if (productsInGroup.length == 0) {
        setDefaultProductMutation.mutate({ id: newItem.id })
      }
      navigate(adminPath.uploadProductAvatar)
    } catch (error) {
      console.log(error)
      if (isAxiosBadRequestError<ErrorRespone>(error)) {
        const formError = error.response?.data
        if (formError) {
          console.error(formError)
        }
      }
    }

    setLoadingPage(false)
  }

  return (
    <div className='space-y-4'>
      <AdminCreatingProductHeader />

      <AdminProductGroupList />

      <div className='rounded-lg border border-white/40 p-4'>
        <FormProvider {...methods}>
          <form className='relative space-y-4 overflow-hidden ' onSubmit={handleSubmit(onSubmit, onInvalid)}>
            {!productGroup && <div className='absolute inset-0 z-10 bg-black/50'></div>}

            <AdminCreateProductForm />
            <div className='col-span-1 mt-2 flex items-center justify-end'>
              <button
                className='rounded-lg bg-haretaColor/80 px-4 py-1 text-base hover:bg-haretaColor desktop:text-lg'
                type='submit'
              >
                Tạo sản phẩm
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
