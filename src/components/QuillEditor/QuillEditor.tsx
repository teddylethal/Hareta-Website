import ReactQuill from 'react-quill'

interface Props {
  value: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (editorState: any) => void
}

export default function QuillEditor({ value, setValue }: Props) {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'] // remove formatting button
  ]
  const module = {
    toolbar: toolbarOptions
  }
  return (
    <ReactQuill theme='snow' modules={module} value={value} onChange={setValue} className='text-darkText bg-lightBg' />
  )
}
