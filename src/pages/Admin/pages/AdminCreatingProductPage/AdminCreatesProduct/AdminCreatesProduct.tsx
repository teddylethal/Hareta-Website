import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { adminProductApi } from 'src/apis/admin.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { AdminContext } from 'src/contexts/admin.context'
import { Product } from 'src/types/product.type'
import { useNavigate } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import AdminCreatesProductForm from 'src/pages/Admin/components/AdminCreatesProductForm'
import { CreateProductSchema, createProductSchema } from 'src/pages/Admin/utils/rules'
import AdminCreatingProductHeader from 'src/pages/Admin/components/AdminCreatingProductHeader'
import AdminProductGroupList from 'src/pages/Admin/components/AdminProductGroupList'
import { AppContext } from 'src/contexts/app.context'
import { ErrorRespone } from 'src/types/utils.type'

type FormData = CreateProductSchema

export default function AdminCreatesProduct() {
  const { setLoadingPage } = useContext(AppContext)
  const { productGroup, setCurrentProduct } = useContext(AdminContext)

  //? Declare states

  // //! Handle avatar
  // const [imageFile, setImageFile] = useState<File>()
  // const previewImage = useMemo(() => {
  //   return imageFile ? URL.createObjectURL(imageFile) : ''
  // }, [imageFile])
  // const handleChangeFile = (file?: File) => {
  //   setImageFile(file)
  // }

  //! CREATE NEW ITEM
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      group_id: '',
      category: '',
      price: 0,
      description: '',
      collection: '',
      type: '',
      quantity: 0,
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
      await setDefaultProductMutation.mutateAsync({ id: newItem.id })
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
        {/* <div className='grid grid-cols-4 items-center gap-2 px-2 py-1'>
          <div className='col-span-1 text-xs uppercase tablet:text-sm desktop:text-base'>Ảnh đại diện</div>
          <div className='col-span-2'>
            <div className='w-full items-center space-y-4 py-4'>
              <div className='relative w-full overflow-hidden rounded-md border border-white/40 pt-[100%]'>
                {previewImage && (
                  <img src={previewImage} alt='ảnh' className='absolute left-0 top-0 h-full w-full object-cover ' />
                )}
                {!previewImage && <div className='absolute left-0 top-0 h-full w-full bg-darkColor900'></div>}
                <div className=' flex w-full justify-center'>
                  <InputFile
                    onChangeImageFile={handleChangeFile}
                    className='bg absolute bottom-2 rounded-md bg-darkColor500 px-2 py-1'
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <FormProvider {...methods}>
          <form className='relative space-y-4 overflow-hidden ' onSubmit={handleSubmit(onSubmit, onInvalid)}>
            {!productGroup && <div className='absolute inset-0 z-10 bg-black/50'></div>}

            <AdminCreatesProductForm />
            <div className='col-span-1 mt-2 flex items-center justify-end'>
              <button
                className='lg:text-lg rounded-lg bg-haretaColor/80 px-4 py-1 text-base hover:bg-haretaColor'
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
