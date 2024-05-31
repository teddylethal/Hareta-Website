import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { reject } from 'lodash'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import eventApi from 'src/apis/event.api'
import { imageApi } from 'src/apis/image.api'
import { HttpStatusMessage } from 'src/constants/httpStatusMessage'
import { adminPath } from 'src/constants/path'
import { CreateEventSchema, createEventSchema } from 'src/rules/adminevent.rule'
import { Image } from 'src/types/image.type'
import { ErrorRespone, SuccessRespone } from 'src/types/utils.type'
import { formatTimeToSeconds, generateNameId, isAxiosBadRequestError } from 'src/utils/utils'

type FormData = CreateEventSchema

const currentDate = new Date()

export default function AdminEventCreate() {
  const [excutingDialog, setExcutingDialog] = useState<boolean>(false)
  const [excuting, setExcuting] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorUploadImage, setErrorUploadImage] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  //! Handle avatar
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const handleChangeFile = (file?: File) => {
    setFile(file)
  }

  //! Form methods
  const methods = useForm<FormData>({
    defaultValues: {
      overall_content: '',
      detail_content: '',
      date_start: currentDate,
      date_end: currentDate,
      discount: 0,
      avatar: ''
    },
    resolver: yupResolver(createEventSchema)
  })
  const { handleSubmit, reset } = methods

  //! Handle submit form
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInvalid = (errors: any) => {
    reject(errors)
  }
  const createEventMutation = useMutation({
    mutationFn: eventApi.createEvent
  })
  const uploadImageMutation = useMutation({
    mutationFn: imageApi.uploadImage
  })

  const onSubmit = async (data: FormData) => {
    setExcutingDialog(true)
    setExcuting(true)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let newUploadedImageRespone: AxiosResponse<SuccessRespone<Image>, any> | null = null
    if (file) {
      const uploadImageBody = {
        file: file
      }
      newUploadedImageRespone = await uploadImageMutation.mutateAsync(
        { ...uploadImageBody },
        {
          onError: () => {
            setError(true)
            setErrorUploadImage(true)
          }
        }
      )
    }

    const newEventBody = {
      ...data,
      date_start: formatTimeToSeconds(data.date_start.getTime()),
      date_end: formatTimeToSeconds(data.date_start.getTime()),
      avatar: newUploadedImageRespone ? newUploadedImageRespone.data.data.url : ''
    }
    createEventMutation.mutate(newEventBody, {
      onSettled: () => {
        setExcuting(false)
        window.scrollTo({ top: 0, left: 0 })
      },
      onSuccess: ({ data: respone }) => {
        setError(false)
        reset()
        setFile(undefined)
        queryClient.invalidateQueries({ queryKey: ['blogs'] })
        navigate(
          { pathname: `${adminPath.events}/${generateNameId({ name: data.overall_content, id: respone.data })}` },
          { state: { from: 'AdminEventCreate' } }
        )
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorRespone>(error)) {
          const formError = error.response?.data
          if (formError) {
            const responeLog = formError?.log as string
            console.log(responeLog)
            setErrorMessage(HttpStatusMessage.get(formError.error_key) || 'Lỗi không xác định')
          }
        }
        setError(true)
      }
    })
  }
  return <div>AdminEventCreate</div>
}
