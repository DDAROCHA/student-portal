import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Connecting to backend...');

  useEffect(() => {
    fetch('http://localhost:3001/message') //http://34.237.142.7:3001/message
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Error connecting to backend'));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Student Portal</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
