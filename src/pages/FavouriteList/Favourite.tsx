import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Product } from 'src/types/product.type'
import likeItemAPi from 'src/apis/userLikeItem.api'
import { useQuery } from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faHeartCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { formatCurrency } from 'src/utils/utils'

interface Column {
  id: 'product' | 'category' | 'collection' | 'type' | 'price' | 'action'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'product', label: 'Product', minWidth: 170 },
  { id: 'category', label: 'Category', minWidth: 100 },
  {
    id: 'collection',
    label: 'Collection'
  },
  {
    id: 'type',
    label: 'Type'
  },
  {
    id: 'price',
    label: 'Price'
  },
  { id: 'action', label: 'Action', minWidth: 170 }
]

interface Data {
  item: Product
  category: string
  collection: string
  type: string
  price: number
  action: React.ReactNode
}

// function createData({ item, category, collection, type, price, action }: Data) {
//   return (

//   )
// }

const rows = []

// const createRender = (value: string) => {
//   switch (value) {
//     case 'item':
//       return <div className='flex'>
//       <button className='flex flex-grow items-center' onClick={handleClickItem(item)}>
//         <div className='flex h-24 w-24 flex-shrink-0 items-center'>
//           <img
//             alt={item.name}
//             src={
//               item.avatar
//                 ? item.avatar.url
//                 : 'https://static.vecteezy.com/system/resources/previews/000/582/613/original/photo-icon-vector-illustration.jpg'
//             }
//           />
//         </div>
//         <div className='ml-4 flex-grow px-2 text-left'>
//           <div className='truncate text-base lg:text-lg'>{item.name}</div>
//         </div>
//       </button>
//     </div>

//     default:
//       break;
//   }
// }

export default function StickyHeadTable() {
  const { data: favouriteListData } = useQuery({
    queryKey: ['favourite_list'],
    queryFn: () => {
      return likeItemAPi.getFavouriteList()
    },
    staleTime: 3 * 60 * 1000
  })
  const favouriteList = favouriteListData?.data.data as Product[]

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, backgroundColor: 'black' }}>
        <Table stickyHeader aria-label='Favourite List'>
          <TableHead>
            <TableRow sx={{ textTransform: 'uppercase' }} className='text-textDark dark:text-textLight'>
              <TableCell align='center'>Product</TableCell>
              <TableCell align='center'>Category</TableCell>
              <TableCell align='center'>Collection</TableCell>
              <TableCell align='center'>Type</TableCell>
              <TableCell align='center'>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favouriteList.map((item) => (
              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} className='h-20'>
                <TableCell component='th' scope='row'>
                  <div className='flex'>
                    <button className='flex flex-grow items-center'>
                      <div className='flex h-24 w-24 flex-shrink-0 items-center'>
                        <img
                          alt={item.name}
                          src={
                            item.avatar
                              ? item.avatar.url
                              : 'https://static.vecteezy.com/system/resources/previews/000/582/613/original/photo-icon-vector-illustration.jpg'
                          }
                        />
                      </div>
                      <div className='ml-4 flex-grow px-2 text-left'>
                        <div className='truncate text-base lg:text-lg'>{item.name}</div>
                      </div>
                    </button>
                  </div>
                </TableCell>
                <TableCell align='center' className='capitalize'>
                  {item.category}
                </TableCell>
                <TableCell align='center' className='capitalize'>
                  {item.collection}
                </TableCell>
                <TableCell align='center' className='capitalize'>
                  {item.type}
                </TableCell>
                <TableCell align='center' className='capitalize'>
                  {item.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
