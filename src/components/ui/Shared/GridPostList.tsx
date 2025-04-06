import { useUserContext } from '@/context/AuthContext';
import { Models } from 'appwrite';
import React from 'react';
import { Link } from 'react-router-dom';
import Poststats from './Poststats';

type GridPostListProps={
    post: Models.Document[],
    showUser? : boolean 
    showStats? : boolean 


}

function GridPostList({posts , showUser=true , showStats= true} : GridPostListProps) {

    const {user} = useUserContext();

  return (
    <ul className='grid-container'>
      {posts.map((post)=>{
        return (
          <li key={post.$id} className='relative min-w-80 h-80'>
            <Link to={`/posts/${post.$id}`} className='grid-post_link'>
            <img src={post.imageUrl.replace('preview', 'view')} alt="post-image"
            className='h-full w-full object-cover'  />
            </Link>
            <div className='grid-post_user'>
              {showUser  && (
                <div className='flex items-center justify-start gap-2 flex-1'>
                  <img src={post.creator.imageUrl}   className='rounded-full h-8 w-8' alt="creator-icon" />
                  <p className='line-clamp-1'>{post.creator.name}</p>

                </div>
              )}
              {
                showStats && (<Poststats userId={user.id} post={post}/>)
              }

            </div>
          </li>
        )
      })}

    </ul>
  )
}

export default GridPostList
