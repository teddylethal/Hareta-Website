interface Props {
  text: string
  className?: string
}

export default function Button({ text, className }: Props) {
  return (
    <div className='w-full rounded-md bg-black text-center uppercase text-textVintage duration-500 hover:bg-opacity-90 hover:text-haretaColor dark:bg-vintageColor'>
      <button type='submit' className={className}>
        {text}
      </button>
    </div>
  )
}
