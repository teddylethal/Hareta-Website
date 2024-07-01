// import classNames from 'classnames'
// import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import Input from 'src/components/Input'

// export default function CartCouponUsing() {
//   const [usingCoupon, setUsingCoupon] = useState(false)
//   const [coupon, setCoupon] = useState('')
//   const [invalidcoupon, setInvalidCoupon] = useState(false)

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCoupon(event.target.value)
//   }

//   //! Multi languagues
//   const { t } = useTranslation('cart')

//   return (
//     <div className='space-y-4'>
//       <div className='flex items-center justify-center space-x-4 uppercase'>
//         <p className='text-lg font-semibold desktop:text-xl'>{t('coupon.You are having coupons?')}</p>
//         <button
//           onClick={() => setUsingCoupon(true)}
//           className='rounded-xl bg-unhoveringBg px-4 py-2 text-sm font-medium uppercase text-darkText hover:bg-hoveringBg desktop:text-base'
//         >
//           {t('coupon.Use now')}
//         </button>
//       </div>

//       {usingCoupon && (
//         <div className='flex flex-col items-center space-y-4'>
//           <div className='w-10/12 border-t tablet:w-8/12 desktop:w-4/12'></div>
//           <p className='text-center text-lg desktop:text-xl'>
//             {t('coupon.Use the codes received from events or previous purchases to get discounts')}
//           </p>
//           <div className='flex items-center space-x-4'>
//             <Input
//               type='text'
//               value={coupon}
//               onChange={handleInputChange}
//               className='text-darkText'
//               inputClassName={classNames(
//                 'w-full rounded-xl py-1 px-3 desktop:text-lg outline-none outline focus:outline-primaryColor',
//                 {
//                   'outline-alertRed': invalidcoupon
//                 }
//               )}
//             />
//             <button className='rounded-xl bg-unhoveringBg px-4 py-1 text-sm font-medium uppercase text-darkText hover:bg-hoveringBg desktop:text-base'>
//               {t('coupon.Use')}
//             </button>
//           </div>
//           {invalidcoupon && <p className='desktop:tetx-lg font-medium text-alertRed '>{t('coupon.Invalid coupon')}</p>}
//         </div>
//       )}
//     </div>
//   )
// }
