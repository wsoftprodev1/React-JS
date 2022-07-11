import { Button, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useContext, useState } from "react"
import { IPost } from "../post"
import { SnackbarContext } from "./SnackbarContext"

export const Form = ({post,onSave}: {
    post?:IPost, 
    onSave:(title: string, description:string)=>void
})=>{
    const { showSnackbar } = useContext(SnackbarContext)
    const [title, setTitle] = useState<string>(post?.title || '')
    const [description, setDescription] = useState<string>(post?.body || '')


    const handleSubmit =  (e:React.FormEvent)=>{
        e.preventDefault()
        if(!title.trim()){
            showSnackbar('error', 'field title is empty')
            return
        }
        if(!description.trim()){
            showSnackbar('error', 'field description is empty')
            return
        }

        onSave(title, description )

    }

    return <Box sx={{
        display: 'flex',
        paddingTop: post ? '10px': '65px',
        justifyContent: 'center',
        alignItems: 'center'
        }}>
        <form onSubmit={(e)=>handleSubmit(e)} style={{padding:'5px'}}>
            <TextField
                style={{ width: "300px", marginBottom: "10px" }}
                type="text"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                label="title"
                variant="outlined"
            />
            <br />
            <TextField
                aria-label="minimum height"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                label="Description"
                style={{ width: '100%', marginBottom: "10px" }}
            />
            <br />
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Button type='submit' variant="contained" color="primary">
            save
            </Button>
            </Box>
        </form>
    </Box>
}