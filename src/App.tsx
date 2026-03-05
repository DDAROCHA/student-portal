import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { StudentsList } from './students/StudentsList';
import { Dashboard } from './components/Dashboard';
import { About } from './components/About';
import { useState } from 'react';
import { ParticlesBackground } from './components/ParticlesBackground';

function App() {
  const [message, setMessage] = useState('Connecting to backend...');

  return (
    <BrowserRouter>
      {/* Fondo de partículas */}
      <ParticlesBackground />

      {/* Contenedor principal */}
      <div className="relative z-10 min-h-screen text-white p-10 flex flex-col items-center">
        {/* Título centrado */}
        <h1 className="text-6xl font-extrabold mb-10 text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.9)] text-center">
          STUDENT PORTAL
        </h1>

        {/* Navbar con estilo neón */}
        <nav className="flex space-x-10 mb-16">
          <Link
            to="/"
            className="text-lg font-semibold text-cyan-400 hover:text-pink-400 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.9)]"
          >
            Dashboard
          </Link>
          <Link
            to="/students"
            className="text-lg font-semibold text-cyan-400 hover:text-green-400 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] hover:drop-shadow-[0_0_20px_rgba(34,197,94,0.9)]"
          >
            Students
          </Link>
          <Link
            to="/about"
            className="text-lg font-semibold text-cyan-400 hover:text-yellow-400 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] hover:drop-shadow-[0_0_20px_rgba(34,197,94,0.9)]"
          >
            About
          </Link>
        </nav>

        {/* Contenido de las rutas */}
        <div className="w-full max-w-6xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
