import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine'; // These functions help send messages and indicate when someone is typing


const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;

  // This function is called whenever the user types in the input field
  const handleChange = (event) => {
    setValue(event.target.value);
    isTyping(props, chatId);
  };

  // This function is called when the user submits input
  const handleSubmit = (event) => {
    event.preventDefault(); // / Prevent the default behavior (which would refresh the page after submission)

    const text = value.trim();

    // If there is an input send the message from current user (creds) to the active chat with the users input
    if (text.length > 0) {
      sendMessage(creds, chatId, { text }); 
    }

    setValue(''); // Clear the input field after sending the message
  };

  // This function handles file uploads (like images) when the user wants to send them in the chat
  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' }); // Send the selected files as a message
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>

      {/* This is the input field where the user types their message */}
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {/* This is the button to upload files (like images) */}
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />  {/* This is the icon for the upload button */}
        </span>
      </label>

      {/* This is the hidden input field for selecting files */}
      <input
        type="file"
        multiple={false} // Can only select one file at a time
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)} // This function is called when the user selects a file by binding file selcted to the upload
      />

      {/* This is the send button to submit the message */}
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" /> {/* The icon for the send button */}
      </button>

    </form>
  );
};

export default MessageForm;