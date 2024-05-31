import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import productApi from 'src/apis/product.api'
import LoadingSection from 'src/components/LoadingSection'
import PathBar from 'src/components/PathBar'
import mainPath from 'src/constants/path'
import { ProductListQueryConfig } from 'src/hooks/useProductListQueryConfig'
import EventProductCard from '../../components/EventProductCard'

const boo = true

export default function EventDetail() {
  const currentUrl = useLocation().pathname

  //! Multi languages
  const { t } = useTranslation('event')

  //! Get product list
  const itemsConfig: ProductListQueryConfig = { limit: String(10) }
  const { data: itemsData } = useQuery({
    queryKey: ['default-products', itemsConfig],
    queryFn: () => {
      return productApi.getProductList(itemsConfig)
    }
  })
  const displayedItems = itemsData?.data.data || []

  return (
    <div className='bg-lightBg py-2 duration-200 dark:bg-darkBg tablet:py-3 desktop:py-4 '>
      {!boo && <LoadingSection />}
      {boo && (
        <div className='container space-y-8'>
          <PathBar
            pathList={[
              { pathName: t('path.event'), url: mainPath.events },
              { pathName: 'hi', url: currentUrl }
            ]}
          />

          <div className='space-y-6'>
            <p className='text-center text-xl font-bold uppercase leading-10 tracking-wide text-haretaColor tablet:text-2xl desktop:text-3xl'>
              {'Summer Keycap Sale with up to 50% off on all our unique and stylish keycaps!'}
            </p>

            <div className='flex w-full items-center justify-center'>
              <img
                src='https://d2csq352pki9k7.cloudfront.net/image/454931600.png'
                alt='Ha'
                className='h-full w-full object-scale-down tablet:w-10/12 desktop:w-8/12'
              />
            </div>
            <div className='gird-cols-1 grid gap-4 tablet:grid-cols-12'>
              <div className='col-span-1 tablet:col-span-8 tablet:border-r tablet:px-4'>
                <p className=''>
                  Welcome to Our Summer Keycap Sale Extravaganza! As the days grow longer and the sun shines brighter,
                  it’s time to bring a splash of summer into your workspace with our stunning collection of keycaps.
                  We’re excited to announce our much-anticipated Summer Keycap Sale, offering you incredible discounts
                  of up to 50% on our entire range of keycaps. This is the perfect opportunity to revamp your keyboard
                  with vibrant, high-quality keycaps that will make your typing experience more enjoyable and visually
                  appealing. Why Choose Our Keycaps? Our keycaps are designed with both aesthetics and functionality in
                  mind. Made from premium materials, they offer a satisfying tactile feel and durability that withstands
                  the test of time. Each keycap is meticulously crafted to ensure a perfect fit and smooth typing
                  experience. Whether you’re a gamer, a coder, or someone who spends a lot of time typing, our keycaps
                  are designed to enhance your productivity and bring a touch of personal style to your keyboard. What’s
                  on Sale? Artisan Keycaps: Discover our unique artisan keycaps, each one a miniature work of art.
                  Handcrafted with intricate designs and vibrant colors, these keycaps are perfect for those who want to
                  add a personal touch to their keyboard setup. Themed Sets: Choose from our themed keycap sets that
                  bring a cohesive look to your keyboard. From retro gaming to minimalist designs, there’s something for
                  everyone. Customizable Options: Create your own custom keycap sets with our wide range of colors and
                  styles. Mix and match to create a keyboard that truly reflects your personality. Glow-in-the-Dark
                  Keycaps: Light up your night-time typing sessions with our glow-in-the-dark keycaps. These keycaps
                  absorb light during the day and emit a soothing glow at night, making them both fun and functional.
                  Special Offers and Discounts Up to 50% Off: Enjoy massive discounts on our entire keycap collection.
                  Whether you’re looking for a single standout piece or a complete set, you’ll find unbeatable prices
                  during our sale. Bundle Deals: Take advantage of our special bundle deals. Buy more and save more with
                  our curated keycap bundles that offer even greater savings. Limited-Time Offers: Don’t miss out on our
                  flash sales and limited-time offers. Check our website daily for exclusive deals that you won’t find
                  anywhere else. Why Summer is the Best Time to Buy Summer is a season of change and renewal. Just as we
                  refresh our wardrobes and homes, it’s the perfect time to give your keyboard a makeover. Our Summer
                  Keycap Sale provides the ideal opportunity to do just that. With our wide selection of keycaps at
                  unbeatable prices, you can easily transform your keyboard into a summer-inspired masterpiece. How to
                  Shop the Sale Visit Our Website: Browse our extensive collection of keycaps on our website. Use the
                  filter options to find exactly what you’re looking for, whether it’s a specific color, theme, or
                  material. Easy Checkout: Our streamlined checkout process makes it easy to complete your purchase. We
                  offer multiple payment options for your convenience. Fast Shipping: Enjoy fast and reliable shipping
                  on all orders. We ship worldwide, so no matter where you are, you can take advantage of our Summer
                  Keycap Sale. Customer Support: Have questions or need assistance? Our dedicated customer support team
                  is here to help. Contact us via email, chat, or phone, and we’ll ensure you have a smooth shopping
                  experience. Conclusion Don’t let this opportunity pass you by. The Summer Keycap Sale is your chance
                  to upgrade your keyboard with beautiful, high-quality keycaps at unbeatable prices. Whether you’re
                  looking to add a touch of personality to your workspace or enhance your typing experience, our keycaps
                  are the perfect solution. Shop now and bring the spirit of summer to your keyboard! Thank you for
                  being a part of our community, and happy shopping!
                </p>
              </div>
              <div className='col-span-1 space-y-4 tablet:col-span-4'>
                <p className='text-center text-xl font-semibold uppercase text-haretaColor desktop:text-2xl'>
                  {t('detail.Products in event')}
                </p>

                <div className='grid w-full grid-cols-2 flex-col gap-6 tablet:grid-cols-1 tablet:px-4 desktop:gap-8'>
                  {displayedItems.map((product) => (
                    <div key={product.id} className='col-span-1'>
                      <EventProductCard discount={50} product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
