import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Listbox, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { IState, State } from 'country-state-city'
import { Fragment, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OrderContext } from 'src/contexts/order.context'

interface Props {
  isError?: boolean
}

export default function SelectState({ isError = false }: Props) {
  const { addressCountry, addressState, setStateAddress } = useContext(OrderContext)
  const [stateList, setStateList] = useState<IState[]>(State.getStatesOfCountry(addressCountry.isoCode))

  useEffect(() => {
    if (addressState?.countryCode == addressCountry.isoCode) return
    setStateList(State.getStatesOfCountry(addressCountry.isoCode))
    setStateAddress(null)
  }, [addressCountry.isoCode, addressState?.countryCode, setStateAddress])

  //? translation
  const { t } = useTranslation('order')

  return (
    <Listbox value={addressState} onChange={setStateAddress}>
      <div className='relative mt-1'>
        <Listbox.Button
          className={classNames(
            'sm:text-sm md:text-base lg:text-lg xl:text-xl relative flex w-full cursor-default  items-center justify-between rounded-lg border  bg-white py-2 text-left text-xs dark:bg-black',
            {
              'border-black/40 dark:border-white/40': !isError,
              'border-red-700 dark:border-red-700': isError
            }
          )}
        >
          <span className='block truncate px-3'>
            {addressState ? addressState.name : t('shipping information.State / Province')}
          </span>
          <span className='pointer-events-none right-0 flex items-center pr-2'>
            <FontAwesomeIcon icon={faChevronDown} className=' text-gray-400' />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <Listbox.Options className='md:text-sm lg:text-lg absolute z-[2] mt-1 max-h-60 w-full overflow-auto rounded-md  bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black'>
            {stateList?.map((state, stateIdx) => (
              <Listbox.Option
                key={stateIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-haretaColor text-darkText' : 'text-darkText dark:text-lightText'
                  }`
                }
                value={state}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-medium'}`}>{state.name}</span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-primaryColor'>
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
