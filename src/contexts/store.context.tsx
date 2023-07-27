import { useState, createContext } from 'react'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface StoreContextInterface {
  sorting: string
  setSorting: React.Dispatch<React.SetStateAction<string>>
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
  collection: string
  setCollection: React.Dispatch<React.SetStateAction<string>>
  type: string
  setType: React.Dispatch<React.SetStateAction<string>>
}

const initialStoreContext: StoreContextInterface = {
  sorting: 'Newest',
  setSorting: () => null,
  category: '',
  setCategory: () => null,
  collection: '',
  setCollection: () => null,
  type: '',
  setType: () => null
}

export const StoreContext = createContext<StoreContextInterface>(initialStoreContext)

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [sorting, setSorting] = useState<string>(initialStoreContext.sorting)
  const [category, setCategory] = useState<string>(initialStoreContext.category)
  const [collection, setCollection] = useState<string>(initialStoreContext.collection)
  const [type, setType] = useState<string>(initialStoreContext.type)

  return (
    <StoreContext.Provider
      value={{ sorting, setSorting, category, setCategory, collection, setCollection, type, setType }}
    >
      {children}
    </StoreContext.Provider>
  )
}
