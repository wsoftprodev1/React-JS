import axios,  { AxiosError } from 'axios';
import { IPost } from '../post';



axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/posts';
const headers = {headers:{'Content-type': 'application/json; charset=UTF-8'}}


export const getAllPosts = async ()=>{
    try {
        const {data} = await axios.get('')
        return data
    } catch (err) {
        const errors = err as Error | AxiosError;
        return errors.message  
    }
}

export const createPost = async ({title, description}:{title:string,description: string})=>{
    try{
    const {data} = await axios.post('/',{title,body: description},headers)
        return data
    } catch(err){
        const errors = err as Error | AxiosError;
        return errors.message
    }
}

export const getPost = async (id:number)=>{
    try {
        const {data} =  await axios.get(`/${id}`)
        return data
    } catch (err) {
        const errors = err as Error | AxiosError;
        return errors.message
    }
}

export const deletePost = async (id:number)=>{
    try {
        const post = await axios.delete(`/${id}`)
        return post
    } catch (err) {
        const errors = err as Error | AxiosError;
        return errors.message
    } 
}

export const updatePost = async (post:IPost)=>{
    try {
        const {data} = await axios.put(`/${post.id}`,post, headers)
        return data
    } catch (err) {
        const errors = err as Error | AxiosError;
        return errors.message
    }
}