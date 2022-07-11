import {  
    Box,
    Button,
    Dialog,
    DialogContent, DialogTitle, IconButton, Tooltip, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { IPost } from "../post"
import { RoutesEnum } from "../routes"
import { deletePost, getPost, updatePost } from "../services"
import { Form } from "./Form";
import { SnackbarContext } from "./SnackbarContext";

export const Details = ()=>{

    const { showSnackbar } = useContext(SnackbarContext)

    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost]= useState<IPost>()
    const [isShowEditModal,setIsShowEditModal] = useState<boolean>(false)
    
    useEffect(()=>{
        (async function(){
            const data =  await getPost(Number(id))
            if(typeof data === 'string'){
                showSnackbar('error',data)
        
            }else{
                setPost(data)
            }
        })()
        
    }, [id, showSnackbar])

    const handleDeletePost = async()=>{
        if(post?.id){
          const data = await deletePost(post.id)
          if(typeof data === 'string'){
            showSnackbar('error', data)
            return
        }
        showSnackbar('success', 'Deleted new post')
        navigate(RoutesEnum.home)
        }
    }

    const handleSave = async (title:string, description: string) =>{

        const data = {
            id: post?.id,
            userId: post?.userId,
            title,
            body: description
        } as IPost

        const result = await updatePost(data)

        if(typeof result === 'string'){
            showSnackbar('error', result)
            return
        }
        showSnackbar('success', 'Updated  post')
        setIsShowEditModal(false)
        navigate(RoutesEnum.home)
    }

    return <Box>
        <Box sx={{
            height: '50px',
            width:'100%',
            padding:'5px',
            backgroundColor:'blue',
            position:'fixed',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            zIndex:'999'
            }}>
                <Typography 
                    component="div"
                    color='white'
                    variant="h4">
                    Post
                </Typography>
                <Button 
                    onClick={()=> navigate(RoutesEnum.home)}
                    sx={{marginRight:'15px'}}
                    variant="contained">
                     Back to all Posts
                </Button>
        </Box>
        <Box sx={{padding:'70px 20px 20px 20px'}}>
            <Box sx={{display: 'flex',alignItems:'center', gap: '10px', marginBottom: '10px'}}>
                <Typography variant="h6">Title:</Typography>
                <Typography>{post?.title}</Typography>
            </Box>
            <Box sx={{display: 'flex', gap: '10px', alignItems:'baseline'}}>
                <Typography variant="h6">Description:</Typography>
                <Typography sx={{maxWidth: 400}}>{post?.body}</Typography>
            </Box>
            <Tooltip title='Delete post'>
            <IconButton onClick={handleDeletePost} aria-label="delete" color='primary' size="large">
                 <DeleteIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title='Edit post'>
            <IconButton onClick={()=>setIsShowEditModal(true)} aria-label="edit" color='primary' size="large">
                 <EditIcon />
            </IconButton>
            </Tooltip>
            <Dialog open={isShowEditModal} onClose={()=> setIsShowEditModal(false)}>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <Form post={post} onSave={handleSave} />
                </DialogContent>
            </Dialog>
        </Box>
    </Box>
}