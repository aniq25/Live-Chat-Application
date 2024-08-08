// This function displays messages from other people in the chat
const TheirMessage = ({ lastMessage, message }) => {
    // This checks if the current message is the first message by this user to ensure it is not a message from logged in user,
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username;
  
    return (
      <div className="message-row">

        {/* If this is the first message by this user, display their avatar */}
        {isFirstMessageByUser && (
          <div
            className="message-avatar"
            style={{ backgroundImage: message.sender && `url(${message.sender.avatar})` }}
          />
        )}

         {/* If the message contains attachments (by seeing if more than 1 is selected), display the image */}
        {message.attachments && message.attachments.length > 0
          ? (
            <img
              src={message.attachments[0].file} // Displaying first attachment selected
              alt="message-attachment"
              className="message-image"
              style={{ marginLeft: isFirstMessageByUser ? '4px' : '48px' }}
            />
          )
          // If it is just text display the inputted text
          : (
            <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
              {message.text}
            </div>
          )}
      </div>
    );
  };
  
  export default TheirMessage;