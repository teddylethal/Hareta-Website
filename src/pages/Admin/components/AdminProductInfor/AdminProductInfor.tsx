import React from 'react'
import { Product } from 'src/types/product.type'

interface Props {
  productDetail: Product
}

export default function AdminProductInfor({ productDetail }: Props) {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-4 items-center gap-2'>
        <div className='col-span-2'>
          <p className='lg:text-lg text-base font-medium uppercase text-white/60'>group name</p>
        </div>
        <div className='col-span-2'>
          <div className='lg:text-lg cursor-not-allowed rounded-lg bg-[#101010] px-2 py-1 text-base capitalize text-haretaColor outline-none'>
            {productDetail.name}
          </div>
        </div>
      </div>
    </div>
  )
}
