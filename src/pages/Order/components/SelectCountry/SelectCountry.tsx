import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Listbox, Transition } from '@headlessui/react'
import { Country } from 'country-state-city'
import { Fragment, useContext } from 'react'
import { OrderContext } from 'src/contexts/order.context'

const COUNTRIES = Country.getAllCountries()

export default function SelectCountry() {
  const { addressCountry, setCountryAddress } = useContext(OrderContext)

  return (
    <Listbox value={addressCountry} onChange={setCountryAddress}>
      <div className='relative mt-1'>
        <Listbox.Button className='relative flex w-full cursor-default items-center justify-between rounded-lg border border-black/40 bg-white py-2 text-left text-xs dark:border-white/40 dark:bg-black sm:text-sm md:text-base lg:text-lg xl:text-xl'>
          <span className='block truncate px-3'>{addressCountry?.name}</span>
          <span className='pointer-events-none right-0 flex items-center pr-2'>
            <FontAwesomeIcon icon={faChevronDown} className=' text-gray-400' />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <Listbox.Options className='absolute z-[2] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1  text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black md:text-sm lg:text-lg'>
            {COUNTRIES.map((country, countryIdx) => (
              <Listbox.Option
                key={countryIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? 'bg-vintageColor/60 text-textLight dark:bg-haretaColor/60'
                      : 'text-textDark dark:text-textLight'
                  }`
                }
                value={country}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-medium'}`}>
                      {country.name}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-brownColor dark:text-haretaColor'>
                        <FontAwesomeIcon icon={faCheck} className='h-5 w-5' />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
