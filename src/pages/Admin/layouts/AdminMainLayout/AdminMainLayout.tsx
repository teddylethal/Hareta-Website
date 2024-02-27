import classNames from 'classnames'
import { createContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import { ProductGroup, Product } from 'src/types/product.type'
import { ProductImage } from 'src/types/productImage.type'

interface AdminContextInterface {
  ProductGroup: ProductGroup | null
  setProductGroup: React.Dispatch<React.SetStateAction<ProductGroup | null>>
  currentItem: Product | null
  setCurrentItem: React.Dispatch<React.SetStateAction<Product | null>>
  currentImage: ProductImage | null
  setCurrentImage: React.Dispatch<React.SetStateAction<ProductImage | null>>
  orderID: string
  setOrderID: React.Dispatch<React.SetStateAction<string>>
}

const initialAdminContext: AdminContextInterface = {
  ProductGroup: null,
  setProductGroup: () => null,
  currentItem: null,
  setCurrentItem: () => null,
  currentImage: null,
  setCurrentImage: () => null,
  orderID: '',
  setOrderID: () => null
}
interface Props {
  children?: React.ReactNode
}

export const AdminContext = createContext<AdminContextInterface>(initialAdminContext)

export default function AdminLayout({ children }: Props) {
  //? DECLARE STATES
  const [ProductGroup, setProductGroup] = useState<ProductGroup | null>(initialAdminContext.ProductGroup)
  const [currentItem, setCurrentItem] = useState<Product | null>(initialAdminContext.currentItem)
  const [currentImage, setCurrentImage] = useState<ProductImage | null>(initialAdminContext.currentImage)
  const [orderID, setOrderID] = useState<string>(initialAdminContext.orderID)

  return (
    <AdminContext.Provider
      value={{
        ProductGroup,
        setProductGroup,
        currentItem,
        setCurrentItem,
        currentImage,
        setCurrentImage,
        orderID,
        setOrderID
      }}
    >
      <div className='bg-darkBg'>
        <div className='container'>
          <div className='py-8'>
            {/* <div className='relative flex items-center justify-around rounded-xl  border border-haretaColor py-2 text-base font-semibold text-textLight/80 lg:text-xl'>
              <NavLink
                to={adminPath.createItem}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-textLight': !isActive
                  })
                }
              >
                Create
              </NavLink>
              <NavLink
                to={adminPath.uploadProductAvatar}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-textLight': !isActive
                  })
                }
              >
                Update
              </NavLink>
              <NavLink
                to={adminPath.addItemImage}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-textLight': !isActive
                  })
                }
              >
                Item Images
              </NavLink>
              <NavLink
                to={adminPath.deleteItem}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-textLight': !isActive
                  })
                }
              >
                Delete
              </NavLink>
            </div> */}
            <div className='lg:text-xl relative flex items-center justify-around  rounded-xl border border-haretaColor py-2 text-base font-semibold text-textLight/80'>
              {/* <div className='absolute left-1/2 top-0 h-full border-l border-white/40'></div> */}
              <NavLink
                to={adminPath.products}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-textLight': !isActive
                  })
                }
              >
                Item
              </NavLink>

              <NavLink
                to={adminPath.image}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-textLight': !isActive
                  })
                }
              >
                Image
              </NavLink>

              <NavLink
                to={adminPath.orderManagemnet}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-textLight': !isActive
                  })
                }
              >
                Order
              </NavLink>
            </div>
            <div className='py-4 text-textLight'>{children}</div>
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  )
}
