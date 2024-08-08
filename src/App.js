// This is the main chat engine that handles all the chat functionality
import { ChatEngine } from 'react-chat-engine';

import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

const projectID = '5c177bcd-ce9e-4a62-80f8-8f772bc01d97'; // Connects the app to the chat engine

const App = () => {
  // If no username is found it renders the LoginForm component to log in
  if (!localStorage.getItem('username')) return <LoginForm />;

   // If the user is logged in, render the ChatEngine component (responsible for displaying the chat interface)
  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')} // Get username from local storage 
      userSecret={localStorage.getItem('password')} // Get user's password from local storage to log the user in
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />} // 'chatAppProps' contains various properties related to the chat application to display messages in chatFeed comp. 
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()} // This plays a sound whenever a new message is received
    />
  );
};

// infinite scroll, logout, more customizations...

export default App;