import React,{useState,useEffect} from 'react'
import Messages from './Messages'
import Input from './Input'
import io from "socket.io-client";
import queryString from 'query-string';
import {Toast,ToastHeader,ToastBody} from 'react-bootstrap';

const Chat = ({location}) => {

  const {id,username,room} = queryString.parse(location.search);
  const [messages,setMessages] = useState([]);
  const [message,setMessage] = useState('');
  const [join,setJoin] = useState({user:'',join:''});
  let socket = io('http://localhost:5000/');

  const sendMessage = (e,message)=>{
    e.preventDefault();
    //console.log(message)
    socket.emit('sendMessage',{message,username,room,id});
    setMessage('');
  }

  useEffect(() => {
    socket.emit('join', { id,username, room });

      socket.on('message', (msg) => {
        if(msg.join){
          
         setTimeout(setJoin, 4000,{})
        return setJoin({user:msg.user,join:msg.join});
        }
      setMessages(messages =>[...messages,msg])
      //console.log(messages)
    });
    return () => {
      socket.disconnect();
    }
  }, [location.search])


    return (
        <div className='chat-container'>
          {join.join?( 
          <Toast >
         <Toast.Body> {join.user} has joined! </Toast.Body>
         </Toast>):(null)}
          <Messages messages={messages} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>  
        </div>
    )
}

export default Chat
