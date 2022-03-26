import React,{useState,useEffect}from 'react';
import queryString from 'query-string'
import  io from 'socket.io-client'
import { useLocation } from "react-router-dom"; // to use the specific search query 
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer'


let socket;
function Chat() {
  const [name,setName]=useState('');
  const [room,setRoom]=useState('');
  const [messages,setMessages]=useState([]);
  const [message,setMessage]=useState('');
  const [users,setUsers]=useState('');
  const search = useLocation().search; // to retrieve specific search attribute
  const ENDPOINT='localhost:5000';

  useEffect(()=>{ 
    const {name,room}=queryString.parse(search); // to parse the data to proper value
 
    socket=io(ENDPOINT);
    setName(name);
    setRoom(room);
   
    socket.emit('join',{name,room},(error)=>{
      if(error) {
        alert(error);
      }
    });
    return ()=>{
      socket.emit('disconnect');  // for willunmount
      socket.off();
    }
  },[ENDPOINT,search]);
   // adding array prevents rendering many times and only render if any change occurs in array result
    
   useEffect(()=>{
    socket.on('message',(message)=>{
setMessages([...messages,message]);
    });
    socket.on('roomData',({users})=>
    setUsers(users))
   },[messages] );

   const sendMessage=(event)=>{
     event.preventDefault();
     if(message){
       socket.emit('sendMessage',message,()=>setMessage('')); 
     }
   }
   return (
      
   <div className='outerContainer'>
     <div className='container'>
       <InfoBar room={room} />
       <Messages messages={messages} name={name} />
       <Input message={message} setMessage={setMessage}
       sendMessage={sendMessage}/>
     </div>
     <TextContainer users={users} setUsers={setUsers} />
   </div>
  ) 
}

export default Chat;