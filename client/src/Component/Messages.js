import React from 'react'

const Messages = ({messages}) => {
    return (
        <div className='messages-container'>
            {messages.map(message=><h6 style={{marginLeft:'8px',marginTop:'12px'}}>{message.user }:{message.message}</h6>)}
        </div>
    )
}

export default Messages
