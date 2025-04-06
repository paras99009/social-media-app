import PostForm from '@/components/form/PostForm'
import Loader from '@/components/ui/Shared/Loader';
import { useGetPostById } from '@/lib/reac-query/queriesAndMutations';
import React from 'react'
import { useParams } from 'react-router-dom';

function EditPost() {
  const {id } = useParams();
  const { data:post , ispending:isLoadingPost } = useGetPostById(id || " ");

  if(isLoadingPost){
    return <Loader/>
  }
  return (
    <div className='flex flex-1 '>
      <div className='common-container'>
        <div className='max-w-5xl flex gap-3 justify-normal w-full'>
          <img src="/assets/icons/add-post.svg" height={36} width={36} alt="add" />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
        </div>


        <PostForm action='Update' post={post} />
      </div>
      
    </div>
  )
}

export default EditPost;
