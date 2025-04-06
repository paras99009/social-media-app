

import { INewPost, INewUser, IUpdatePost, IUpdateUser } from '@/types'
import {
useQuery,
useMutation,
useQueryClient,
useInfiniteQuery

} from '@tanstack/react-query'
import { createPost, createUserAccount, deletePost, deleteSavedPost, getCurrentUser, getInfinitePost, getPostById, getRecentPosts, getUserById, getUsers, likePost, savePost, searchPost, signInAccount, signOutAccount, updatePost, updateUser } from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys';





// Ye custom hook `useCreateUserAccount` ek mutation return karega jo naye user ka account create karega
export const useCreateUserAccount = () => {
    return useMutation(
        {
            // mutationFn ka kaam hai API function ko call karna jab mutation execute ho
            mutationFn: (user: INewUser) => createUserAccount(user)
        }
    )
}

// Ye custom hook `useSignInAccount` ek mutation return karega jo existing user ko sign in karega
export const useSignInAccount = () => {
    return useMutation(
        {
            // mutationFn ka kaam hai API function ko call karna jab mutation execute ho
            mutationFn: (user: { email: string, password: string }) => signInAccount(user)
        }
    )
}
export const useSignOutAccount = () => {
    return useMutation(
        {
            // mutationFn ka kaam hai API function ko call karna jab mutation execute ho
            mutationFn: ()=> signOutAccount()
        }
    )
}
export const useCreatePost = () => {
    const queryclient = useQueryClient()

    return useMutation(
        {
            // mutationFn ka kaam hai API function ko call karna jab mutation execute ho
            mutationFn: (post :  INewPost)=> createPost(post)
            ,
            // onSuccess ka kaam hai mutation successful hone par kuch karna    
            onSuccess:()=>{
                queryclient.invalidateQueries({
                    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
                }
                 )
            }
        }
    )
}

export const useGetRecentPosts = ()=>{
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts,
    })
}


export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        postId,
        likesArray,
      }: {
        postId: string;
        likesArray: string[];
      }) => likePost(postId, likesArray),
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
      },
    });
  };


  export const useSavePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
        savePost( postId, userId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
      },
    });
  };
 
  export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
      },
    });
  };  



export const useGetPostById = (postId:string)=>{
    return useQuery({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID,postId],
        queryFn: ()=> getPostById(postId),
        enabled: !!postId
        
    })
}
export const useUpdatePost = ()=>{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (post: IUpdatePost)=> updatePost(post),
        onSuccess: (data)=>{
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
            });
        }
        
    })
}
export const useDeletePost = ()=>{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({postId,imageId}: {postId:string, imageId: string} )=> deletePost(postId,imageId),
        onSuccess: (data)=>{
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
            });
        }
        
    })
}

export const useGetPost = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],
    queryFn: getInfinitePost,
    initialPageParam: null, // Ensure a proper initial value
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.documents.length === 0) return null;
      return lastPage.documents[lastPage.documents.length - 1].$id; // Use the document ID
    },
  });
};



export const useSearchPost = (searchTerm : string)=>{
  return useQuery({
    queryKey:[QUERY_KEYS.SEARCH_POSTS,searchTerm],
    queryFn: ()=> searchPost(searchTerm),
    enabled: !!searchTerm
  })

}


export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export const useGetUsers = (limit?: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getUsers(limit),
  });
};

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IUpdateUser) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
      });
    },
  });
};


