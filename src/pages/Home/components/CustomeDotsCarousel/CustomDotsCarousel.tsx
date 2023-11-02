import classNames from 'classnames'

interface Props {
  active: boolean | undefined
}

export default function CustomDotsCarousel({ active }: Props) {
  return (
    <div
      className={classNames('mb-2 h-2 w-2 rounded-full md:h-3 md:w-3 lg:mb-4 xl:mx-0.5 xl:h-4 xl:w-4', {
        'bg-black/80 dark:bg-white/80': !active,
        'bg-vintageColor dark:bg-haretaColor': active
      })}
    ></div>
  )
}
