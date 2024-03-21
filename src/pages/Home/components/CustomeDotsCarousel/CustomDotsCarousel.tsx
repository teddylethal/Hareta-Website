import classNames from 'classnames'

interface Props {
  active: boolean | undefined
}

export default function CustomDotsCarousel({ active }: Props) {
  return (
    <div
      className={classNames(
        'mb-2 h-2 w-2 rounded-full tablet:h-3 tablet:w-3 desktop:mb-4 desktopLarge:mx-0.5 desktopLarge:h-4 desktopLarge:w-4',
        {
          'bg-black/80 dark:bg-white/80': !active,
          'bg-vintageColor dark:bg-haretaColor': active
        }
      )}
    ></div>
  )
}
