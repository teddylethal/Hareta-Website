import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import Button from 'src/components/Button'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import path from 'src/constants/path'
import { ErrorRespone } from 'src/types/utils.type'
import { RequestVerifySchema, requestVerifySchema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'
import AccountInput from 'src/components/AccountInput'
import AnimateTransition from 'src/layouts/RegisterLayout/components/AnimateTransition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import passwordRecovery from 'src/apis/passwordRecovery.api'
import RecoveryEmailSentPopup from 'src/components/VerifyEmailDialog/RecoveryEmailSentPopup'
import InvalidLinkPopup from 'src/components/VerifyEmailDialog/InvalidLinkPopup'

type FormData = RequestVerifySchema

export default function RequestPasswordRecovery() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(requestVerifySchema)
  })

  const { state } = useLocation()
  const [dialogFail, setDialogFail] = useState(false)
  const [dialogSuccess, setDialogSuccess] = useState(false)

  useEffect(() => {
    if (state) {
      if (state.failSlugVerify) {
        setDialogFail(true)
      }
    }
  }, [state, setDialogFail])

  //Counter
  const [counter, setCounter] = useState(0)
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  const passwordRecoveryMutation = useMutation({
    mutationFn: (body: FormData) => passwordRecovery.requestRecovery(body)
  })

  const onSubmit = handleSubmit((data) => {
    passwordRecoveryMutation.mutate(data, {
      onSuccess: () => {
        setDialogSuccess(true)
        setCounter(60)
      },
      onError: (error) => {
        // console.log(error)
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          const formError = error.response?.data
          const errorRespone = HttpStatusMessage.find(({ error_key }) => error_key === formError?.error_key)
          if (errorRespone) {
            setError('email', {
              message: errorRespone.error_message,
              type: 'Server'
            })
          }
        } else {
          setError('email', {
            message: 'Something went wrong',
            type: 'Server'
          })
        }
      }
    })
  })

  return (
    <>
      <AnimateTransition isDialog={state?.failSlugVerify}>
        <div className='container'>
          <div className='grid grid-cols-1 py-12 md:grid-cols-6 md:px-6 md:py-24'>
            <div className='md:col-start-2 md:col-end-6 lg:col-span-3 lg:col-end-7'>
              <form
                className='rounded bg-[#F5F5F5] p-5 shadow-sm duration-500 dark:bg-[#222222] md:p-10'
                onSubmit={onSubmit}
                noValidate
              >
                <div>
                  <Link to={path.login} className='absolute'>
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      fontSize={32}
                      className='hidden pr-4 text-vintageColor/80 opacity-70 duration-300 hover:opacity-100 dark:text-haretaColor md:block'
                    />
                  </Link>
                  <div className=' text-center text-base uppercase text-vintageColor dark:text-haretaColor sm:text-xl xl:text-2xl'>
                    Recover your password
                  </div>
                </div>

                <AccountInput
                  name='email'
                  register={register}
                  type='text'
                  className='autofill:bg-red-400 autofill:text-textDark autofill:dark:text-textLight md:mt-8'
                  errorMessage={errors.email?.message}
                  labelName='Email'
                  required
                  // notifyMessage={notifySuccess}
                  autoComplete='on'
                  svgData={
                    <>
                      <path d='M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z' />
                      <path d='M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z' />
                    </>
                  }
                />

                <div className='text-base md:mt-2 lg:text-lg'>
                  <Button
                    className='flex w-full items-center justify-center py-2 lg:py-3'
                    type='submit'
                    isLoading={passwordRecoveryMutation.isLoading || counter > 0}
                    disabled={passwordRecoveryMutation.isLoading || counter > 0}
                  >
                    {counter != 0 ? 'Wait for ' + counter + 's' : 'Send'}
                  </Button>
                </div>
                <div className='mt-3 flex justify-center text-sm md:hidden'>
                  <p className='text-gray-400'>Go back to</p>
                  <Link
                    to={path.login}
                    className='ml-1 text-brownColor dark:text-haretaColor/70 hover:dark:text-haretaColor'
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AnimateTransition>
      <InvalidLinkPopup dialog={dialogFail} closeDialog={() => setDialogFail(false)} />
      <RecoveryEmailSentPopup dialog={dialogSuccess} closeDialog={() => setDialogSuccess(false)} />
    </>
  )
}
