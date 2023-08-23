// import { yupResolver } from '@hookform/resolvers/yup'
// import { useMutation } from '@tanstack/react-query'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
// import Button from 'src/components/Button'
// import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
// import path from 'src/constants/path'
// import { ErrorRespone } from 'src/types/utils.type'
// import { RequestVerifySchema, requestVerifySchema } from 'src/utils/rules'
// import { isAxiosBadRequestError } from 'src/utils/utils'
// import AccountInput from 'src/components/AccountInput'
// import { checkEmailVerified, unSetEmailVerified } from 'src/utils/store'
// import AnimateTransition from 'src/layouts/RegisterLayout/components/AnimateTransition'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
// import FailEmailVerify from 'src/components/VerifyEmailDialog/FailEmailVerify'
// import verifyEmail from 'src/apis/verifyEmail.api'
import RequestPasswordRecovery from './components/RequestPasswordRecovery'
import ChangePasswordRecovery from './components/ChangePasswordRecovery'
import passwordRecovery from 'src/apis/passwordRecovery.api'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import FailSlugVerify from './components/FailSlugVerify'

// type FormData = RequestVerifySchema

export default function PasswordRecovery() {
  // const {
  //   register,
  //   handleSubmit,
  //   setError,
  //   setValue,
  //   // clearErrors,
  //   // reset,
  //   // watch,
  //   formState: { errors }
  // } = useForm<FormData>({
  //   resolver: yupResolver(requestVerifySchema)
  // })

  // const { state } = useLocation()
  // console.log(state)

  // const [dialog, setDialog] = useState(false)
  // useEffect(() => {
  //   if (checkEmailVerified()) {
  //     setDialog(checkEmailVerified())
  //     unSetEmailVerified()
  //   }
  //   if (state) {
  //     setValue('email', state.email)
  //     // setError('email', {
  //     //   message: 'Please verify your email.',
  //     //   type: 'Server'
  //     // })
  //   }
  // }, [])

  const [searchParams] = useSearchParams()
  const [dialog, setDialog] = useState(false)
  const closeDialog = () => setDialog(false)
  const slug = searchParams.get('slug')
  const requestRecovery = slug == null

  return (
    <>
      {requestRecovery ? (
        <>
          <RequestPasswordRecovery />
          {dialog && <FailSlugVerify dialog={dialog} closeDialog={closeDialog} />}
        </>
      ) : (
        <ChangePasswordRecovery setDialog={setDialog} />
      )}
    </>
  )
}
