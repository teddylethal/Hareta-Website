import { faCircleArrowRight, faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import verifyEmail from 'src/apis/verifyEmail.api'
import DialogPopup from 'src/components/DialogPopup'
import VerifyEmailPopup from 'src/components/VerifyEmailPopup'
import path from 'src/constants/path'
import { setEmailVerified } from 'src/utils/store'

export default function VerifyEmail() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [dialog, setDialog] = useState(true)
  const closeDialog = () => {
    setDialog(false)
  }
  const { data, status, error } = useQuery({
    queryKey: ['check-verification-code'],
    queryFn: () => verifyEmail.verifyCode(code as string)
  })

  useEffect(() => {
    if (data) {
      setEmailVerified()
      navigate(path.login)
    }
    if (error) {
      // console.log(error)
      setEmailVerified()
      navigate(path.requestVerify)
    }
  }, [data, status, error, navigate])

  return (
    <>
      <div>stillhere</div>
      {/* <button onClick={() => setDialog(true)}>asdfasfsadfsdf</button> */}
      {/* <VerifyEmailPopup
        isOpen={dialog}
        handleClose={closeDialog}
        classNameWrapper='rounded-2xl flex flex-col p-5 dark:bg-black dark:text-textDark font-newfont'
      >
        <p className='text-3xl font-semibold '>Email Verification</p>
        <div className='flex items-center py-2 pl-2'>
          <FontAwesomeIcon icon={faCircleXmark} fontSize={90} className='text-red-600' />
          <div className='h-full pl-5 text-left text-gray-400 '>
            <p className='text-xl'>Your link is expired.</p>
            <p className='mb-3 text-xl'>Please re-send the verification request</p>
            <button
              className='h-9 w-24 rounded-3xl bg-[#039ef0] text-xl font-semibold text-white outline-none hover:bg-[#039ef0]/70 hover:text-white/90'
              onClick={closeDialog}
            >
              Exit
            </button>
          </div>
        </div>
      </VerifyEmailPopup> */}
    </>
    // <div className='flex h-screen w-screen items-center justify-center bg-darkBg'>
    //   {res ? (
    //   ) : (
    //     <div className='h-[350px] w-[400px] rounded-3xl bg-[#302e38] text-textVintage'>
    //       <div className='flex w-full justify-between p-5'>
    //         <div>Hareta Website</div>
    //         <div>Email Verification</div>
    //       </div>
    //       <div className='mt-5 flex w-full justify-center'>
    //         <FontAwesomeIcon icon={faCircleXmark} fontSize={120} className='text-red-600' />
    //       </div>

    //       <div className='mt-3 flex w-full flex-col items-center'>
    //         <div className='text-2xl'>Something gone wrong!!</div>
    //         <div className='text-sm'>You will be redirected in</div>
    //         <Link to={path.login}>
    //           <FontAwesomeIcon
    //             icon={faCircleArrowRight}
    //             fontSize={50}
    //             className='mt-3 text-gray-400 hover:text-textVintage'
    //           />
    //         </Link>
    //       </div>
    //     </div>
    //   )}

    //   {/* <div>hello</div> */}
    //   {/* {res ? <div className='text-textVintage'>Email Verified</div> : <div className='text-textVintage'>Waht the</div>} */}
    // </div>
  )
}
