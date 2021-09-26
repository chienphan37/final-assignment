import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import postApi from "../../api/postApi";
import {PostProps} from "../Post/post";

function PostDetail() {
   let id = useParams<{ id: string }>().id;
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');
   const [post, setPost] = useState<PostProps | null>(null);
   useEffect(() => {
      setIsLoading(true);
      let didCancel = false;
      postApi.get(id).then((res: any) => {
         if (!didCancel) {
            setIsLoading(false);
            setPost(res)
         }
      }).catch(() => {
         if (!didCancel) {
            setIsLoading(false);
            setError(error)
         }
      })
      return () => {
         didCancel = true
      };

   }, [])
   if (isLoading) return (
      <h3>Loading</h3>
   );
   if (error) return (
      <div style={{color: 'red'}}>{error} </div>
   );
   return (
      <div>
         <div>
            <b>ID:</b> {post?.id}
         </div>
         <div>
            <b>Title:</b> {post?.title}
         </div>
         <div><b>Content: </b></div>
         <div>{post?.body}</div>
      </div>
   );
}

export default PostDetail;
