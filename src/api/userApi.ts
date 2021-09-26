import axiosClient from "../utils/axiosClient";

class UserApi {

   login = () => {
      const url = `https://60dff0ba6b689e001788c858.mockapi.io/token`
      return axiosClient.get(url)
   }
   get = (id: number) =>{
      const url = `https://60dff0ba6b689e001788c858.mockapi.io/users/${id}`
      return axiosClient.get(url)
   }
}

const userApi = new UserApi();
export default userApi;
