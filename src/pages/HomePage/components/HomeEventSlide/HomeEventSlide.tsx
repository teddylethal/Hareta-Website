import React from 'react'
import { useNavigate } from 'react-router-dom'
import { EventSlide } from '../../utils/types.util'

interface Props {
  event: EventSlide
}

export default function HomeEventSlide({ event }: Props) {
  const navigate = useNavigate()

  return (
    <div className='relative flex h-full w-full items-center justify-center bg-white'>
      <p className='text-6xl'>hello</p>
    </div>
  )
}
