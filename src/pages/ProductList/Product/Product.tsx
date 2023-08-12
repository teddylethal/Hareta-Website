import { faCartPlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Product as ProductType } from 'src/types/product.type'
import { useContext } from 'react'
import { StoreContext } from 'src/contexts/store.context'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { setCollectionFilteringToLS, setTypeFilteringToLS } from 'src/utils/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { omit } from 'lodash'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import purchaseApi from 'src/apis/cart.api'
import { toast } from 'react-toastify'

interface Props {
  product: ProductType
  queryConfig: QueryConfig
}

export default function Product({ product, queryConfig }: Props) {
  const navigate = useNavigate()
  const { setCollection, setType } = useContext(StoreContext)

  const queryClient = useQueryClient()

  const addToCartMutation = useMutation(purchaseApi.addToCart)
  const addToCart = () => {
    addToCartMutation.mutate(
      { item_id: product.id as string, quantity: 1 },
      {
        onSuccess: () => {
          toast.success('Item was added', {
            autoClose: 1000
          })
          queryClient.invalidateQueries({ queryKey: ['items_in_cart'] })
        }
      }
    )
  }

  const handleCollectionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedCollection = String((e.target as HTMLInputElement).innerText)

    setCollection(selectedCollection)
    setCollectionFilteringToLS(selectedCollection)
    setType('All')
    setTypeFilteringToLS('All')

    navigate({
      pathname: path.store,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            collection: selectedCollection
          },
          ['type', 'page', 'limit']
        )
      ).toString()
    })
  }

  const handleTypeClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedType = String((e.target as HTMLInputElement).innerText)

    setType(selectedType)
    setTypeFilteringToLS(selectedType)
    setCollection('All')
    setCollectionFilteringToLS('All')

    navigate({
      pathname: path.store,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            type: selectedType
          },
          ['collection', 'page', 'limit']
        )
      ).toString()
    })
  }

  // console.log(product.avatar.url)
  return (
    <div className='relative h-full w-full bg-[#efefef] px-2 pb-4 pt-2 duration-500 dark:bg-[#303030]'>
      <div className='relative w-full pt-[75%]'>
        <Link to={`${path.home}${generateNameId({ name: product.name, id: product.id })}`}>
          <img
            src={
              product.avatar
                ? `${product.avatar.url}`
                : 'https://static.vecteezy.com/system/resources/previews/000/582/613/original/photo-icon-vector-illustration.jpg'
            }
            alt={product.name}
            className='absolute left-0 top-0 h-full w-full object-scale-down'
          />
        </Link>
      </div>
      <div className='mx-1 mt-3 flex justify-between space-x-1'>
        <div className='flex flex-col justify-between space-y-1'>
          <Link
            to={`${path.home}${generateNameId({ name: product.name, id: product.id })}`}
            className='truncate text-lg text-textDark duration-500 dark:text-textLight'
          >
            {product.name}
          </Link>
          <div className='flex items-center space-x-4'>
            <button
              className='flex justify-start text-sm text-gray-500 hover:text-haretaColor'
              onClick={handleCollectionClick}
            >
              {product.collection}
            </button>
            <button
              className='flex justify-start text-sm text-gray-500 hover:text-haretaColor'
              onClick={handleTypeClick}
            >
              {product.type}
            </button>
          </div>
          <span className='text-haretaColor'>${formatCurrency(product.price)}</span>
        </div>

        <div className='mx-1 flex flex-col items-center justify-between'>
          <button>
            <FontAwesomeIcon icon={faHeart} fontSize={24} />
          </button>
          <button className='' onClick={addToCart}>
            <FontAwesomeIcon
              icon={faCartPlus}
              fontSize={24}
              className='text-textDark duration-500 hover:text-haretaColor dark:text-textLight dark:hover:text-haretaColor'
            />
          </button>
        </div>
      </div>
      <div className='absolute left-0 top-4'>
        <span className='flex h-6 w-20 items-center justify-center bg-red-600 text-center text-sm text-textDark'>
          Favourite
        </span>
        <div className='absolute left-20 top-0 h-0 w-0 border-[12px] border-y-red-600 border-l-red-600 border-r-transparent' />
      </div>
    </div>
  )
}
