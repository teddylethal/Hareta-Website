import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminEventDetail() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return <div>AdminEventDetail</div>
}
