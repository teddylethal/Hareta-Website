import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from 'src/components/Button'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import path from 'src/constants/path'
import { ErrorRespone } from 'src/types/utils.type'
import { RequestVerifySchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'
import AnimateTransition from 'src/layouts/RegisterLayout/components/AnimateTransition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import verifyEmail from 'src/apis/verifyEmail.api'
import useTimer from 'src/hooks/useTimer'
import VerificationEmailSentPopup from 'src/components/VerifyEmailDialog/VerificationEmailSentPopup'
import EmailNotVerifiedPopup from 'src/components/VerifyEmailDialog/EmailNotVerifiedPopup'

type FormData = RequestVerifySchema

export default function RequestVerifyEmail() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [dialog, setDialog] = useState(false)
  const [emailSentDialog, setEmailSentDialog] = useState(false)
  const [error, setError] = useState('')

  const { counter, setCounter } = useTimer()

  useEffect(() => {
    if (state && state.error == 'Please verify your email') {
      setDialog(true)
    } else {
      navigate(path.login, { state: { type: 'Fail', title: 'EmailVerification', context: 'Invalid Verification' } })
    }
  }, [navigate, state])

  const requestVerifyMutation = useMutation({
    mutationFn: (body: FormData) => verifyEmail.requestVerify(body)
  })

  const onSubmit = () => {
    requestVerifyMutation.mutate(
      { email: state.email },
      {
        onSuccess: () => {
          setEmailSentDialog(true)
          setCounter(60)
        },
        onError: (error) => {
          // console.log(error)
          if (isAxiosBadRequestError<ErrorRespone>(error)) {
            const formError = error.response?.data
            const errorRespone = HttpStatusMessage.find(({ error_key }) => error_key === formError?.error_key)
            if (errorRespone) {
              setError(errorRespone.error_message)
              // toast.error(errorRespone.error_message)
            }
          }
        }
      }
    )
  }
  // const email = watch('email')
  // useEffect(() => {
  //   console.log(123)
  //   reset('email':'test')
  // }, [email, clearErrors])

  return (
    <AnimateTransition>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 md:grid-cols-6 md:px-6 md:py-24'>
          <div className='md:col-start-2 md:col-end-6 lg:col-span-3 lg:col-end-7'>
            <div className='rounded bg-[#F5F5F5] p-5 shadow-sm duration-500 dark:bg-[#222222] md:p-10'>
              <div>
                <Link to={state?.from || path.login} className='absolute'>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    fontSize={32}
                    className='hidden pr-4 text-vintageColor/80 hover:text-vintageColor dark:text-haretaColor md:block'
                  />
                </Link>
                <div className='text-center text-2xl uppercase text-vintageColor dark:text-haretaColor'>
                  Email Verification
                </div>
              </div>

              <div className='flex flex-col items-center justify-center p-5 md:pb-0'>
                <div className='flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='h-6 w-6 fill-black duration-300 dark:fill-vintageColor md:h-8 md:w-8'
                  >
                    <>
                      <path d='M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z' />
                      <path d='M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z' />
                    </>
                  </svg>
                  <div className='ml-2 text-center text-lg text-[#666666] dark:text-textVintage/80'>Your email: </div>
                </div>
                <div className='ml-3 text-xl text-blue-700 dark:text-blue-400'>{state?.email}</div>
                <div className='mt-4 w-4/5 sm:w-3/5'>
                  <Button
                    className='flex w-full items-center justify-center py-2 lg:py-3'
                    type='submit'
                    isLoading={requestVerifyMutation.isLoading || counter != 0}
                    disabled={requestVerifyMutation.isLoading || counter != 0}
                    onClick={onSubmit}
                  >
                    {counter > 0 ? 'Send in ' + counter + 's' : 'VERIFY EMAIL'}
                  </Button>
                </div>
                <div className='mt-3 flex justify-center text-sm md:hidden'>
                  <p className='text-gray-400'>Go back to</p>
                  <Link to={path.login} className='ml-1 text-brownColor dark:text-haretaColor'>
                    Login
                  </Link>
                </div>
                <div className={'mt-2 text-red-600 ' + (error ? '' : 'invisible')}>{error}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailNotVerifiedPopup
        dialog={dialog}
        closeDialog={() => {
          setDialog(false)
        }}
      />

      <VerificationEmailSentPopup
        dialog={emailSentDialog}
        closeDialog={() => {
          setEmailSentDialog(false)
        }}
      />
    </AnimateTransition>
  )
}
