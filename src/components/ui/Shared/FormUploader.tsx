import React from 'react'
import  {useCallback} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'
type FileUploaderProps = {
    fieldChange: (FILES : File[]) => void, 
    mediaUrl: string;
}


function FormUploader({fieldChange,mediaUrl}:FileUploaderProps) {

    //usestates for file and fileUrl
    const [fileUrl, setFileUrl] = React.useState(mediaUrl)
    const [file, setFile] = React.useState<File[]>([]);





    const onDrop = useCallback((acceptedFiles : FileWithPath[] ) => {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))

        
      }, [file])
      const {getRootProps, getInputProps} = useDropzone({onDrop,
        accept:{
            'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
        }
      })


  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
    <input {...getInputProps()}  className='cursor-pointer '/>
    {
      fileUrl ?
      (
        <>
      <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
        <img src={fileUrl} alt="file" className='file_uploader-img' />
      </div>
        <p className='file_uploader-label'>Click or drag photo to replace</p>
        </>
      ):
      (
        <div className='file_uploader-box '>
            <img src="/assets/icons/file-upload.svg" width={96} height={76}  alt="file-upload" />
            <h3 className='text-light-2 base-medium mt-6  mb-2'>Drag Photo here</h3>
            <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
            <button className='shad-button_dark_4 w-full h-12 rounded-xl flex items-center justify-center gap-2'>   
                select from computer
            </button>
        </div>

      )
      
    }
  </div>
  )
}

export default FormUploader
