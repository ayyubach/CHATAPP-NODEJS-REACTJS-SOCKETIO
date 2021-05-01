import React,{useState} from 'react'
import {Form,FormControl,Button,FormGroup,FormLabel,Alert} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import { v4 as uuid } from 'uuid';

const Join = () => {

    const history = useHistory();
    const [userName,setUserName]= useState('');
    const [room,setRoom]= useState('');
    const [error,setError] = useState('');
    const id = uuid();

    const onSubmit= async (e,userName,room)=>{
        e.preventDefault();
        const result = await axios.get(`http://localhost:5000/getuser/${userName}`);
        console.log(`result${result.data}`)
        if(result.data){
        return setError(result.data);
        }
        history.push(`/chat?id=${id}&username=${userName}&room=${room}`);
         
    }

    if(error){
        setTimeout(setError,4000);
    }
    return (
        <div className='join-container'>
            {error?(<Alert variant='danger'>User Already Exist !</Alert>):(null)}
            <Form onSubmit={(e)=>onSubmit(e,userName,room)}>
                <FormGroup>
                    <FormLabel >Username :</FormLabel>
                    <FormControl type='text' name='username' value ={userName} onChange={(e)=>setUserName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <FormLabel>Room :</FormLabel>
                    <FormControl type="text" name='room' value ={room} onChange={(e)=>setRoom(e.target.value)}/>
                </FormGroup>
                <Button type='submit' style={{marginLeft:'46%'}}> Submit</Button>
            </Form>
        </div>
    )
}

export default Join
