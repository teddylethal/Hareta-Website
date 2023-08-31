import classNames from 'classnames'
import { createContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { ItemGroup } from 'src/types/admin.type'
import { Product } from 'src/types/product.type'

interface CreatingItemContextInterface {
  itemGroup: ItemGroup | null
  setItemGroup: React.Dispatch<React.SetStateAction<ItemGroup | null>>
  newAddedItem: Product | null
  setNewAddedItem: React.Dispatch<React.SetStateAction<Product | null>>
}

const initialCreatingItemContext: CreatingItemContextInterface = {
  itemGroup: null,
  setItemGroup: () => null,
  newAddedItem: null,
  setNewAddedItem: () => null
}
interface Props {
  children?: React.ReactNode
}

export const CreatingItemContext = createContext<CreatingItemContextInterface>(initialCreatingItemContext)

export default function AdminLayout({ children }: Props) {
  //? DECLARE STATES
  const [itemGroup, setItemGroup] = useState<ItemGroup | null>(initialCreatingItemContext.itemGroup)
  const [newAddedItem, setNewAddedItem] = useState<Product | null>(initialCreatingItemContext.newAddedItem)

  return (
    <CreatingItemContext.Provider value={{ itemGroup, setItemGroup, newAddedItem, setNewAddedItem }}>
      <div className='bg-darkBg'>
        <div className='container'>
          <div className='py-8'>
            <div className='relative flex items-center justify-around rounded-xl  border border-white/40 py-2 text-base font-semibold text-textLight/80 lg:text-xl'>
              {/* <div className='absolute left-1/2 top-0 h-full border-l border-white/40'></div> */}
              <NavLink
                to={path.adminCreateItem}
                end
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
                to={path.adminAddColor}
                end
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-textLight': !isActive
                  })
                }
              >
                New color
              </NavLink>
              <NavLink
                to={path.adminUploadItemAvatar}
                end
                className={({ isActive }) =>
                  classNames('px-4 py-1 uppercase ', {
                    'text-haretaColor': isActive,
                    'hover:text-textLight': !isActive
                  })
                }
              >
                Item avatar
              </NavLink>
              <NavLink
                to={path.admin}
                end
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
            <div className='py-6 text-textLight lg:py-12'>{children}</div>
          </div>
        </div>
      </div>
    </CreatingItemContext.Provider>
  )
}
