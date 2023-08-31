import * as yup from 'yup'

export const creatingItemSchema = yup.object({
  name: yup.string().required('Name is required'),
  group_id: yup.string().required('Group ID is required'),
  category: yup.string().required('Category is required'),
  collection: yup.string().required('Collection is required'),
  type: yup.string().required('Type is required'),
  color: yup.string().required('Color is required'),
  product_line: yup.string().required('Product line is required'),
  price: yup.number().required('Price is required'),
  quantity: yup.number().required('Quantity is required'),
  description: yup.string().required('Description is required')
})

export type CreatingItemSchema = yup.InferType<typeof creatingItemSchema>
