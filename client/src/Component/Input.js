import React from 'react'
import {Form,FormControl,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Input = ({message,setMessage,sendMessage}) => {
    return (
        <div>
           <Form onSubmit={(e)=>sendMessage(e,message)}>
           <FormControl onChange={(e)=>setMessage(e.target.value)} type='text' name='message' placeholder='Type message...' value={message}/>
           <Button style={{marginLeft:'41%',marginTop:'10px'}} type='submit'>Send</Button>
           <Link to='/'><Button variant='danger' style={{marginLeft:'8px',marginTop:'10px'}}>Quit Chat</Button></Link>  
            </Form> 
        </div>
    )
}

export default Input
