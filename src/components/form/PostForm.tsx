
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea';
import FormUploader from '../ui/Shared/FormUploader';
import { PostValidation } from '@/lib/validation';
import { Models } from 'appwrite';
import { useCreatePost, useUpdatePost } from '@/lib/reac-query/queriesAndMutations';
import { useUserContext } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';


 //defining the post type 
type PostFormProps = {  
  post?: Models.Document;
  action : 'Create' | 'Update'
}

const PostForm = ({ post, action } : PostFormProps) => {

  const {mutateAsync:createPost , isPending: isLoadingCreate} = useCreatePost()
  const {mutateAsync:updatePost , isPending: isLoadingUpdate} = useUpdatePost()
  const {user} = useUserContext()
  const navigate = useNavigate();




  //defining the form 
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
          caption: post? post?.caption : " ",
          file : [],
          location: post? post?.location : " ",
          tags: post? post?.tags.join(',') : " ",
         },
      })


        // 2. Define a submit handler.
       async function onSubmit(values: z.infer<typeof PostValidation>) {
        if(post && action === 'Update'){
          const updatedPost = await updatePost({
            ...values,
            postId: post.$id,
            imageId: post?.id,
            imageUrl: post?.imageUrl,
          })

          if(!updatedPost){
            toast({
              title:"PLease Try Again Editing the Post"
            })
          }
          return navigate(`/posts/${post.$id}`)
        }
        


        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const newPost = await createPost({
          ...values,
          userId: user.id,

        }) 
        if(!newPost){
          toast({
            title:"PLease Try Again"
          })
        }
        navigate('/')



        console.log(values)
      }
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl ">
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caption</FormLabel>
                  <FormControl>
                    <Textarea className='shad-textarea custom-scrollbar' placeholder="shadcn" {...field} />
                  </FormControl>
                 
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Photo</FormLabel>
                  <FormControl>
                    <FormUploader fieldChange = {field.onChange} mediaUrl={post?.imageUrl.replace("/preview", "/view")} />
                  </FormControl>
                 
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Location</FormLabel>
                  <FormControl>
                    <Input  type='text' className='shad-input' placeholder="Location" {...field} />
                  </FormControl>
                 
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Tags (seperated by comma " , ")</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' placeholder="Art, Expression, Learing" {...field} />
                  </FormControl>
                 
                  <FormMessage className='shad-form_message' />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-4 justify-end'>
            <Button type="button" className='shad-button_dark_4'>Cancel</Button>
           {isLoadingCreate? (
            <Loader/>
           ):(

            <Button type="submit" className='shad-button_primary whitespace-nowrap' disabled={isLoadingCreate|| isLoadingUpdate}> {action} Post</Button>
           )}

            </div>
          </form>
        </Form>
      )
}

export default PostForm
