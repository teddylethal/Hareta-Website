import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputNumber from '../InputNumber'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { InputNumberProps } from '../InputNumber/InputNumber'
import { useState } from 'react'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
  classNameInput?: string
  classNameButton?: string
  classNameIcon?: string
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  classNameWrapper,
  classNameInput = 'h-8 mx-2 w-14 rounded-lg p-1 text-center outline-none text-haretaColor dark:bg-black bg-white border border-black/20 dark:border-white/20',
  classNameButton = 'round flex items-center justify-center rounded-full bg-white p-1 text-textDark dark:bg-black dark:text-textLight border border-black/20 dark:border-white/20',
  classNameIcon,
  value,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value || 0))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
    setLocalValue(_value)
  }

  const increaseQuantity = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }

  const decreaseQuantity = () => {
    let _value = Number(value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onFocusOut && onFocusOut(Number(event.target.value))
  }

  return (
    <div className={'flex items-center ' + classNameWrapper}>
      <button className={classNameButton} onClick={decreaseQuantity}>
        <FontAwesomeIcon icon={faMinus} className={classNameIcon} />
      </button>
      <InputNumber
        className=''
        classNameError='hidden'
        classNameInput={classNameInput}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value || localValue}
        {...rest}
      />
      <button className={classNameButton} onClick={increaseQuantity}>
        <FontAwesomeIcon icon={faPlus} className={classNameIcon} />
      </button>
    </div>
  )
}
