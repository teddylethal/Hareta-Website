import classNames from 'classnames'
import { ProductImage } from 'src/types/productImage.type'

interface Props {
  colorArray: string[]
  currentColor: string
  setCurrentColor: React.Dispatch<React.SetStateAction<string>>
  handleChangeColor: () => void
}

export default function ColorBar({ colorArray, currentColor, setCurrentColor, handleChangeColor }: Props) {
  return (
    <>
      {colorArray.map((color, index) => {
        const isActive = color === currentColor
        const handleClick = () => {
          setCurrentColor(color)
          handleChangeColor()
        }

        return (
          <div className='relative w-full pt-[100%]' key={index}>
            <button
              onClick={handleClick}
              className={classNames('absolute left-0 top-0 h-full w-full object-cover')}
              style={{
                backgroundColor: color === 'default' ? undefined : color
              }}
            />
            {isActive && <div className='absolute inset-0 border-2 border-haretaColor' />}
          </div>
        )
      })}
    </>
  )
}
