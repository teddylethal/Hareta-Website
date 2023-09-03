import classNames from 'classnames'
import { createContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { adminPath } from 'src/constants/path'
import { ItemGroup } from 'src/types/admin.type'
import { Product } from 'src/types/product.type'
import { ProductImage } from 'src/types/productImage.type'

interface AdminContextInterface {
  itemGroup: ItemGroup | null
  setItemGroup: React.Dispatch<React.SetStateAction<ItemGroup | null>>
  currentItem: Product | null
  setCurrentItem: React.Dispatch<React.SetStateAction<Product | null>>
  currentImage: ProductImage | null
  setCurrentImage: React.Dispatch<React.SetStateAction<ProductImage | null>>
}

const initialAdminContext: AdminContextInterface = {
  itemGroup: null,
  setItemGroup: () => null,
  currentItem: null,
  setCurrentItem: () => null,
  currentImage: null,
  setCurrentImage: () => null
}
interface Props {
  children?: React.ReactNode
}

export const AdminContext = createContext<AdminContextInterface>(initialAdminContext)

export default function AdminLayout({ children }: Props) {
  //? DECLARE STATES
  const [itemGroup, setItemGroup] = useState<ItemGroup | null>(initialAdminContext.itemGroup)
  const [currentItem, setCurrentItem] = useState<Product | null>(initialAdminContext.currentItem)
  const [currentImage, setCurrentImage] = useState<ProductImage | null>(initialAdminContext.currentImage)

  return (
    <AdminContext.Provider
      value={{ itemGroup, setItemGroup, currentItem, setCurrentItem, currentImage, setCurrentImage }}
    >
      <div className='bg-darkBg'>
        <div className='container'>
          <div className='py-8'>
            <div className='relative flex items-center justify-around rounded-xl  border border-haretaColor py-2 text-base font-semibold text-textLight/80 lg:text-xl'>
              {/* <div className='absolute left-1/2 top-0 h-full border-l border-white/40'></div> */}
              <NavLink
                to={adminPath.creatingPage}
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
                to={adminPath.updatingPage}
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
                to={adminPath.images}
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
                to={adminPath.deletingPage}
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-textLight': !isActive
                  })
                }
              >
                Delete
              </NavLink>
            </div>
            <div className='py-4 text-textLight'>{children}</div>
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  )
}
