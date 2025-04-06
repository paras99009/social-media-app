import PostForm from '@/components/form/PostForm'

function CreatePost() {
  return (
    <div className='flex flex-1 '>
      <div className='common-container'>
        <div className='max-w-5xl flex gap-3 justify-normal w-full'>
          <img src="/assets/icons/add-post.svg" height={36} width={36} alt="add" />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>


        <PostForm action='Create'/>
      </div>
      
    </div>
  )
}

export default CreatePost
