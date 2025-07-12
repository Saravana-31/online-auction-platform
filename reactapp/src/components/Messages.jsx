import React, { useEffect, useState } from 'react';

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/get-messages', {
      credentials: 'include'
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setMessages(data.messages);
      } else {
        console.error(data.error);
      }
    })
    .catch((error) => console.error(error));
  }, []);

  return (
    <div className='message-bada-cont'>
      <div className='messages-container'>
        <h1>Your Messages</h1>
        <ul>
          {messages.map((message) => (
            <li key={message._id}>
              {message.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  );
}

export default Messages;
