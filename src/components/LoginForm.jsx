import { useState } from 'react';
import axios from 'axios';

const projectID = '5c177bcd-ce9e-4a62-80f8-8f772bc01d97';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // This function is called when the user submits the login form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the project ID, username, and password for authentication
    const authObject = { 
      'Project-ID': projectID, 
      'User-Name': username, 
      'User-Secret': password 
    };

    {/* 1.) Make a request to the chat engine API to verify the user's credentials
        2.) If successful, store the username and password in local storage 
        3.) Reload the page to show chat interface and clear any previous errors

    */}
    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      window.location.reload();
      setError('');

    } catch (err) {
      setError('Invalid Credentials.');
    }
  };

  return (
    <div className="wrapper">

      <div className="form">
        <h1 className="title">Chat Application</h1>

        {/* Updates the username/password state when the user types in those fields */}
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          
          {/* Button that submits the form when clicked */}
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>

        </form>

        {/* Display s an error (like incorrect login)*/}
        <h1>{error}</h1>

      </div>
    </div>

  );
};

export default LoginForm;