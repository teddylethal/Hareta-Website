interface Props {
  text: string
}

export default function Button({ text }: Props) {
  return (
    <button
      type='submit'
      className='text-l w-full rounded-md bg-black px-2 py-3 text-center uppercase text-textVintage duration-500 hover:bg-opacity-90 hover:text-haretaColor dark:bg-vintageColor md:py-4'
    >
      {text}
    </button>
  )
}
