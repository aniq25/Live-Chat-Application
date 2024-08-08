import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  // If a chat exists it find the chat that is currently active from list of chats
  const chat = chats && chats[activeChat];

  // This function is used to show "read receipts" ('message' = current message in check & 'isMyMessage' = if message was sent by the logged-in user)
  const renderReadReceipts = (message, isMyMessage) => 
      // Iterate each person in the chat to see if they have read the current message. If the person's last read message is the current message, we display a "read receipt"
      chat.people.map((person, index) => person.last_read === message.id && (
        <div
          key={`read_${index}`}
          className="read-receipt"
          style={{
            float: isMyMessage ? 'right' : 'left',
            backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
          }}
        />
      ));
      
  // This displays all the messages in the active chat
  const renderMessages = () => {

    // Obtain a key of all messages in chat
    const keys = Object.keys(messages);
    
    {/* 1.) Loop through each message key to display the message 
        2.) Get the current message based on the key
        3.) Get the key of the previous message to help determine if we need to show the sender's name again
        4.) Check if the message was sent by the logged-in user
    */}
    return keys.map((key, index) => {
      const message = messages[key]; 
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          {/* 1.) If it's our message, display it using the MyMessage component
              2.) If it's someone else's message, use the TheirMessage component
          */}
          <div className="message-block">
            {isMyMessage
              ? <MyMessage message={message} />
              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]} />}
          </div>

          <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)} {/* Show the read receipts for this message */}
          </div>

        </div>
      );
    });
  };

  if (!chat) return <div />;

  return (
    <div className="chat-feed">

      <div className="chat-title-container">

        <div className="chat-title">
          {chat?.title}
        </div>

        {/* Display the usernames of all the people who are in the chat */}
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>

      </div>

      {renderMessages()} 

      <div style={{ height: '100px' }} />

      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>

    </div>
  );
};

export default ChatFeed;