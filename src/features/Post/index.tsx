import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import postApi from '../../api/postApi';
import {PostProps} from "./post";
import './post.scss'
Post.propTypes = {};

function Post(props: any) {
   const [error, setError] = useState('');
   const [isLoading, setIsLoading] = useState(true);
   const [posts, setPosts] = useState<PostProps[]>([]);
   const [searchText, setSearchText] = useState('');
   const [sortByTitle, setSortByTitle] = useState<string | null>(null);


   const postsFiltered = posts.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()));

   const getPostsSorted = () => {
      if (sortByTitle === null) return postsFiltered;
      return postsFiltered.sort((post1, post2) => {
         if (sortByTitle === 'ASC') return post1.title.localeCompare(post2.title)
         else return post2.title.localeCompare(post1.title)
      });
   }

   const postsSorted = getPostsSorted();

   useEffect(() => {
      let didCancel = false;

      postApi.getAll().then( (response: any) => {
         if (!didCancel) {
            setIsLoading(false);
            setPosts(response);
         }
      }).catch(() => {
         if (!didCancel) {
            setIsLoading(false);
            setError('Error while fetching data ')
         }
      })
      return () => {
         didCancel = true
      }
   }, [])


   const handleSortByTitle = () => {
      if (sortByTitle === null) setSortByTitle('ASC');
      if (sortByTitle === 'ASC') setSortByTitle('DES');
      if (sortByTitle === 'DES') setSortByTitle(null);
   }
   const handleRemovePost = (id: number) => {
      const newPosts = posts.filter(post => post.id !== id);
      setPosts(newPosts)
   }

   if (isLoading) {
      return <div>Loading....</div>
   }
   if (error) return <h1 className="error" >Error { error }</h1>
   return (
      <div>
         <input
            type="text"
            placeholder="Search by title"
            className="search-by-title"
            value={searchText}
            onChange={evt => setSearchText(evt.target.value)}
         />
         <table className="post-table">
            <thead>
            <tr>
               <th>ID</th>
               <th onClick={handleSortByTitle}>
                  Title -- Sort {sortByTitle === null ? '(NONE)' : sortByTitle}
               </th>
               <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
               postsSorted.map((post: PostProps) => (
                  <tr key={post.id}>
                     <td>{post.id}</td>
                     <td>{post.title}</td>
                     <td>
                        <Link to={`posts/${post.id}`}>
                           View detail
                        </Link>
                        <button style={{marginLeft: 15}} onClick={() => handleRemovePost(post.id)}>Remove</button>
                     </td>
                  </tr>
               ))
            }
            </tbody>
         </table>
      </div>
   );
}

export default Post;
