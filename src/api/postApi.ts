import axiosClient from "../utils/axiosClient";

class PostApi {
   getAll = () => {
      const url = 'https://jsonplaceholder.typicode.com/posts'
      return axiosClient.get(url, {}
      );
   }
   get = (id: string | number) => {
      const url = `https://jsonplaceholder.typicode.com/posts/${id}`
      return axiosClient.get(url)
   }
}

const postApi = new PostApi();
export default postApi;
