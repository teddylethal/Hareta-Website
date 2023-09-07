import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Listbox, Transition } from '@headlessui/react'
import { City, ICity, ICountry, IState } from 'country-state-city'
import { Fragment, useEffect, useState } from 'react'

interface Props {
  selectedCountry: ICountry
  selectedState: IState | null
  selectedCity: ICity | null
  setSelectedCity: React.Dispatch<React.SetStateAction<ICity | null>>
}

export default function SelectCity({ selectedCountry, selectedState, selectedCity, setSelectedCity }: Props) {
  const [cityList, setCityList] = useState<ICity[]>(
    selectedState ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode) : []
  )

  useEffect(() => {
    if (selectedState) {
      setCityList(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode))
    }
  }, [selectedCountry, selectedState])

  return (
    <Listbox value={selectedCity} onChange={setSelectedCity}>
      <div className='relative mt-1'>
        <Listbox.Button className='relative flex w-full cursor-default items-center justify-between rounded-lg border border-black/40 bg-white py-2 text-left text-xs dark:border-white/40 dark:bg-black sm:text-sm md:text-base lg:text-lg xl:text-xl'>
          <span className='block truncate px-3'>{selectedCity ? selectedCity.name : 'City'}</span>
          <span className='pointer-events-none right-0 flex items-center pr-2'>
            <FontAwesomeIcon icon={faChevronDown} className=' text-gray-400' />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <Listbox.Options className='absolute z-[2] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1  text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black md:text-sm lg:text-lg'>
            {cityList?.map((city, cityIdx) => (
              <Listbox.Option
                key={cityIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? 'bg-vintageColor/60 text-textLight dark:bg-haretaColor/60'
                      : 'text-textDark dark:text-textLight'
                  }`
                }
                value={city}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-medium'}`}>{city.name}</span>
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
