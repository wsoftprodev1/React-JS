import { Box, Button, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import { IPost } from "../post"
import { getAllPosts } from "../services"
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../routes";
import { SnackbarContext } from "./SnackbarContext";

export const Home = ()=>{
    const {showSnackbar} = useContext(SnackbarContext)
    const navigate = useNavigate()
    const [posts, setPosts] = useState<IPost[]>([])

    useEffect( ()=>{
        (async function(){
            const data =  await getAllPosts()
            if(typeof data === 'string'){
                showSnackbar('error',data)
        
            }else{
                setPosts(data)
            }
        })()
    },[showSnackbar])

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
                    Total Posts
                </Typography>
                <Button 
                    onClick={()=> navigate(RoutesEnum.create)}
                    sx={{marginRight:'15px'}}
                    variant="contained" 
                    startIcon={<AddIcon />}>
                    Create
                </Button>
        </Box>
        <Stack sx={{
            display: 'flex',
            padding: '65px 30px 30px 30px',
            flexDirection:'row',
            flexWrap: 'wrap',
            gap:'20px'}}>
            {posts?.map(item=>(
                <Card 
                    onClick={()=> navigate(`/details/${item.id}`)} 
                    key={item.id} 
                    sx={{ maxWidth: 345,}}>
                    <CardActionArea>
                   <CardContent>
                     <Typography gutterBottom variant="h5" component="div">
                       {item.title.toUpperCase()}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                      {item.body}
                     </Typography>
                   </CardContent>
                   </CardActionArea>
                </Card>
            ))}
        </Stack>
    </Box>
}