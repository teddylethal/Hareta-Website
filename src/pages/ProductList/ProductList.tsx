import useQueryParams from 'src/hooks/useQueryParams'
import AsideFavouriteList from './AsideFavouriteList'
import AsideFilter from './AsideFilter'
import AsideSorter from './AsideSorter'
import Product from './Product'
import SearchBar from './SearchBar'
import { useQuery } from '@tanstack/react-query'
import Pagination from '@mui/material/Pagination'
import productApi from 'src/apis/product.api'
import makeStyles from '@mui/styles/makeStyles'
import { useContext } from 'react'
import { ThemeContext } from 'src/App'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useViewport } from 'src/hooks/useViewport'
import MobileBottomBar from './MobileBottomBar'
import { StoreProvider } from 'src/contexts/store.context'

const useStyles = makeStyles(() => ({
  light: {
    '& .MuiPaginationItem-root': {
      color: '#222',
      // bgcolor: '#f8f8f8',
      borderColor: '#aaa'
    }
  },
  dark: {
    '& .MuiPaginationItem-root': {
      color: '#eee',
      // bgcolor: '#1E1E1E',
      borderColor: '#444'
    }
  }
}))
export default function ProductList() {
  const viewPort = useViewport()
  const isMobile = viewPort.width <= 768
  const MUITheme = createTheme({
    palette: {
      primary: {
        main: '#FFA500'
      }
    }
  })
  const paginationClassname = useStyles()
  const { theme } = useContext(ThemeContext)

  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['items', queryParams],
    queryFn: () => {
      return productApi.getProductList(queryParams)
    }
  })

  return (
    <StoreProvider>
      <div className='bg-lightBg py-6 duration-500 dark:bg-darkBg'>
        <div className='container'>
          {!isMobile && (
            <div className='grid grid-cols-12 gap-6'>
              <div className=' col-span-3 mb-auto overflow-hidden rounded-sm bg-[#E8E8E8] duration-500 dark:bg-[#303030]'>
                <AsideSorter />
                <AsideFilter />
                <AsideFavouriteList />
              </div>
              <div className='col-span-9'>
                <SearchBar />
                <div className='grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-2'>
                  {data &&
                    data.data.data.map((product) => (
                      <div className='col-span-1' key={product.id}>
                        <Product product={product} />
                      </div>
                    ))}
                </div>
                <ThemeProvider theme={MUITheme}>
                  <Pagination
                    count={10}
                    variant='outlined'
                    classes={{ root: theme === 'dark' ? paginationClassname.dark : paginationClassname.light }}
                    color='primary'
                    className='my-4 flex justify-center'
                  />
                </ThemeProvider>
              </div>
            </div>
          )}
          {isMobile && (
            <div>
              <div className='gird-cols-1 grid gap-6 sm:grid-cols-2'>
                {data &&
                  data.data.data.map((product) => (
                    <div className='col-span-1' key={product.id}>
                      <Product product={product} />
                    </div>
                  ))}
              </div>
              <ThemeProvider theme={MUITheme}>
                <Pagination
                  count={10}
                  variant='outlined'
                  classes={{ root: theme === 'dark' ? paginationClassname.dark : paginationClassname.light }}
                  color='primary'
                  className='my-4 flex w-full justify-center'
                />
              </ThemeProvider>
            </div>
          )}
        </div>
        {isMobile && <MobileBottomBar />}
      </div>
    </StoreProvider>
  )
}
