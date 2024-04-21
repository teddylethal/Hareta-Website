import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import verifyEmail from 'src/apis/verifyEmail.api'
import path from 'src/constants/path'

export default function AuthVerifyEmail() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { data, status, error } = useQuery({
    queryKey: ['check-verification-code'],
    queryFn: () => verifyEmail.verifyCode(code as string)
  })

  useEffect(() => {
    if (data) {
      navigate(path.login, {
        state: { type: 'Success', title: 'EmailVerification', context: 'Email is now verified!' }
      })
    }
    if (error) {
      // console.log(error)
      // setEmailVerified()
      navigate(path.login, { state: { type: 'Fail', title: 'EmailVerification', context: 'Invalid Verification' } })
    }
  }, [data, status, error, navigate])

  return <></>
}
