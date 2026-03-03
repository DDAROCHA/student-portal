import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { StudentsList } from './students/StudentsList';
import { Dashboard } from './pages/Dashboard';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('Connecting to backend...');

  return (
    <BrowserRouter>
      <div style={{ padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>
            Dashboard
          </Link>
          <Link to="/students">Students</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
