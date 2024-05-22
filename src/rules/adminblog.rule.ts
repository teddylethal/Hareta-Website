import * as yup from 'yup'

export const createBlogSchema = yup.object({
  title: yup.string().required('Bắt buộc có tiêu đề'),
  content: yup.string().required('Bắt buộc có nội dung'),
  avatar: yup.string()
})

export type CreateBlogSchema = yup.InferType<typeof createBlogSchema>

export const updateBlogSchema = yup.object({
  id: yup.string().required('có ID bài viết'),
  title: yup.string().required('Bắt buộc có tiêu đề'),
  content: yup.string().required('Bắt buộc có nội dung'),
  avatar: yup.string().default('')
})

export type UpdateBlogSchema = yup.InferType<typeof updateBlogSchema>
