import classNames from 'classnames'
import Product from 'src/pages/ProductList/Product'
import { Product as ProductType } from 'src/types/product.type'

interface Props {
  item: ProductType
  currentItem: number
}

export default function TopSellerItem({ item, currentItem }: Props) {
  return (
    <div className={classNames('mx-4')}>
      <Product product={item} />
    </div>
  )
}
