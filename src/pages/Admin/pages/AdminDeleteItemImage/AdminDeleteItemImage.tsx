import { useState } from 'react'
import AdminDialog from '../../components/AdminDialog'
import AdminImagesPage from '../AdminImagesPage'
import { showSuccessDialog } from 'src/pages/ProductList/Product/Product'

export default function AdminDeleteItemImage() {
  const [dialog, setDialog] = useState(false)
  return (
    <div>
      <AdminImagesPage />
      <div className='mt-12'>
        <button
          className=''
          onClick={() => {
            showSuccessDialog(setDialog, 2000)
          }}
        >
          Show dialog
        </button>
      </div>
      <AdminDialog isOpen={dialog} setIsOpen={setDialog} />
    </div>
  )
}
