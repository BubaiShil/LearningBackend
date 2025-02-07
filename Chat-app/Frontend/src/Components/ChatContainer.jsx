import React, { useEffect } from 'react'
import { useChatStore } from '../Store/useMessageStore'
import ChatHeader from './ChatHeader'
import MessageInp from './MessageInp'
import MessageSkeleton from '../skeletons/MessageSkeleton'

const ChatContainer = () => {

  const {messages,isMessagesLoaing,selectedUser,getMessages} = useChatStore()


  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id,getMessages])

  if (isMessagesLoaing) {
    return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInp/>
    </div>)
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <p>messages...</p>
      <MessageInp/>
    </div>
  )
}

export default ChatContainer