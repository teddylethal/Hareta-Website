import { useContext, useState } from 'react'
import AdminDeletePageHeader from '../../components/AdminDeletePageHeader'
import AdminItemGroup from '../../components/AdminItemGroup'
import { AdminContext } from '../../layouts/AdminMainLayout/AdminMainLayout'
import { AppContext } from 'src/contexts/app.context'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'
import { adminItemGroupApi } from 'src/apis/admin.api'
import productApi from 'src/apis/product.api'
import { ItemInGroupConfig } from 'src/types/product.type'
import DialogPopup from 'src/components/DialogPopup'
import AdminDialog from '../../components/AdminDialog'
import ItemTag from 'src/constants/itemTag'
import AdminVariantList from '../../components/AdminVariantList'
import DOMPurify from 'dompurify'

export default function AdminDeleteGroup() {
  const { itemGroup, setItemGroup } = useContext(AdminContext)
  const { setLoadingPage } = useContext(AppContext)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [dialog, setDialog] = useState(false)

  //? GET DEFAULT ITEM
  const itemInGroupQuery: ItemInGroupConfig = {
    id: itemGroup?.id as string,
    page: '1',
    limit: '50'
  }
  const { data: itemsInGroupData } = useQuery({
    queryKey: ['items_in_group_for_detail', itemInGroupQuery],
    queryFn: () => productApi.getItemsInGroup(itemInGroupQuery),
    keepPreviousData: true,
    enabled: Boolean(itemGroup)
  })
  const itemsInGroup = itemsInGroupData?.data.data || []
  const defaultItem = itemsInGroup.find((item) => item.default === true)

  const defaultItemID = defaultItem?.id
  const { data: itemDetailData } = useQuery({
    queryKey: ['item', defaultItemID],
    queryFn: () => productApi.getProductDetail(defaultItemID as string),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(defaultItem)
  })
  const itemDetail = itemDetailData?.data.data

  //? HANDLE DELETE
  const queryClient = useQueryClient()
  const onClickDelete = () => {
    setConfirmDialog(true)
  }

  const deleteItemMutation = useMutation(adminItemGroupApi.deleteItemGroup)
  const handleDelete = () => {
    setConfirmDialog(false)
    setLoadingPage(true)
    deleteItemMutation.mutate(
      { id: itemGroup?.id as string },
      {
        onSuccess: () => {
          showSuccessDialog(setDialog)
          queryClient.invalidateQueries({ queryKey: ['item_groups'] })
          queryClient.invalidateQueries({ queryKey: ['variant_list'] })
          setItemGroup(null)
        }
      }
    )
    setLoadingPage(false)
  }

  return (
    <div>
      <AdminDeletePageHeader />
      <div className='mt-8 grid grid-cols-2 gap-8'>
        <div className='col-span-1'>
          <div className='sticky top-6 space-y-8'>
            <AdminItemGroup />
            <AdminVariantList />
          </div>
        </div>
        <div className='col-span-1'>
          <div className='relative space-y-4 overflow-hidden rounded-lg border border-white/40 p-4'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>Image</p>
              <div className='col-span-2'>
                <div className='relative w-full pt-[75%]'>
                  <img
                    src={defaultItem?.avatar?.url || ''}
                    alt={`${defaultItem?.name} ${defaultItem?.color}`}
                    className='absolute left-0 top-0 h-full w-full object-scale-down'
                  />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>group name</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{itemGroup?.name}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>Variants</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{itemsInGroup.length}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>price</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{itemDetail?.price}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>Color</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{itemDetail?.color}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>category</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{itemDetail?.category}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>collection</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{itemDetail?.collection}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>type</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{itemDetail?.type}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>product line</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{itemDetail?.product_line}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>quantity</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{itemDetail?.quantity}</p>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <p className='col-span-1 text-lg font-medium uppercase text-white/60'>tag</p>
              <p className='col-span-2 text-lg capitalize text-haretaColor'>{ItemTag[itemDetail?.tag || 0]}</p>
            </div>
            <div className='gap-4'>
              <p className='text-lg font-medium uppercase text-white/60'>description</p>
              <div
                className='text-lg capitalize text-haretaColor'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(itemDetail?.description as string)
                }}
              />
            </div>
            {!itemGroup && <div className='absolute inset-0 bg-black'></div>}
          </div>
          {itemGroup && (
            <div className='mt-4 flex w-full items-center justify-end'>
              <button
                className='rounded-lg bg-red-600/80 px-3 py-1 text-xs uppercase hover:bg-red-600 lg:text-sm'
                onClick={onClickDelete}
              >
                delete
              </button>
            </div>
          )}
        </div>
      </div>
      <DialogPopup
        isOpen={confirmDialog}
        handleClose={() => {
          setConfirmDialog(false)
        }}
      >
        <p className='text-center text-3xl font-bold uppercase leading-6 text-red-600'>Dangerous deletion</p>

        <p className='mt-6 text-center text-2xl font-medium uppercase leading-6'>
          Delete a group will delete all items in it
        </p>

        <p className='mt-8 text-center text-lg font-medium leading-6'>Are you sure to delete this group?</p>
        <div className='mt-4 flex justify-between'>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            onClick={() => setConfirmDialog(false)}
          >
            Cancel
          </button>
          <button
            type='button'
            className='inline-flex justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-orange-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </DialogPopup>
      <AdminDialog isOpen={dialog} setIsOpen={setDialog} content='Group was deleted' />
    </div>
  )
}
