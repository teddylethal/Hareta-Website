import ProductSekeleton from '../ProductSkeleton'

export default function ProductListSkeleton() {
  return (
    <div className='mt-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <div key={index} className='col-span-1'>
              <ProductSekeleton />
            </div>
          ))}
      </div>
    </div>
  )
}
