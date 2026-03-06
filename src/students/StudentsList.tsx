import React, { useEffect, useState } from 'react';

import { getCourses, getStudentCourses, assignCourseToStudent } from '../services/courseService';
import { ParticlesBackground } from '../components/ParticlesBackground';

interface Student {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
}

export const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const [courses, setCourses] = useState<any[]>([]);
  const [studentCourses, setStudentCourses] = useState<{ [key: number]: any[] }>({});

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [Uploading, setUploading] = useState(false);
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  const loadStudentCourses = async (studentId: number) => {
    const data = await getStudentCourses(studentId);
    setStudentCourses(prev => ({
      ...prev,
      [studentId]: data,
    }));
  };

  const fetchStudents = () => {
    fetch(`http://localhost:3001/students?page=${page}&limit=6`)
      .then(res => res.json())
      .then(data => {
        setStudents(data.students);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setAdminMode(true);
        alert('Admin mode enabled');
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setUploading(true);
      e.preventDefault();

      let avatarUrl = null;

      console.log('Selected file:', selectedFile);

      if (selectedFile) {
        avatarUrl = await uploadToS3(selectedFile);
      }

      console.log('Avatar URL:', avatarUrl);

      await fetch('http://localhost:3001/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          avatar_url: avatarUrl,
        }),
      });

      setName('');
      setEmail('');
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      fetchStudents();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3001/students/${id}`, {
      method: 'DELETE',
    });

    fetchStudents(); // refresca lista
  };

  const handleUpdate = async (id: number) => {
    await fetch(`http://localhost:3001/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: editName,
        email: editEmail,
      }),
    });

    setEditingId(null);
    fetchStudents();
  };

  const uploadToS3 = async (file: File) => {
    const res = await fetch(
      `http://localhost:3001/students/upload-url?fileName=${file.name}&fileType=${file.type}`
    );

    const { uploadUrl, fileUrl } = await res.json();

    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    return fileUrl;
  };

  //if (loading) return <p>Loading...</p>;

  return (
    <div className="relative z-10 min-h-screen text-white p-10">
      <ParticlesBackground />
      <h1 className="text-5xl font-bold mb-10 text-green-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
        Students
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-cyan-500/40 shadow-lg mb-10 flex flex-wrap gap-4 items-end"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="bg-slate-900/70 border border-cyan-500/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-slate-900/70 border border-cyan-500/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm px-3 py-1 rounded-lg transition"
          >
            Upload Student Picture
          </button>

          {selectedFile && <span className="text-sm text-gray-300">{selectedFile.name}</span>}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={e => {
              if (e.target.files) setSelectedFile(e.target.files[0]);
            }}
            className="hidden"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white transition
                    ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500'}
                `}
        >
          {Uploading ? 'Adding...' : 'Add Student'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-400">Loading students...</p>
        ) : (
          students.map(s => (
            <div
              key={s.id}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-cyan-500/40 shadow-lg hover:shadow-cyan-500/30 transition"
            >
              {editingId === s.id ? (
                <>
                  <div className="flex flex-col gap-2 mb-3">
                    <input
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="w-full bg-slate-900/70 border border-cyan-500/40 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-cyan-400"
                    />

                    <input
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      className="w-full bg-slate-900/70 border border-cyan-500/40 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <button
                    className="bg-green-500 hover:bg-green-400 px-3 py-1 rounded-md mr-2"
                    onClick={() => handleUpdate(s.id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-400 px-3 py-1 rounded-md"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    {s.avatar_url ? (
                      <img
                        src={s.avatar_url}
                        alt={s.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-cyan-400 shadow-md"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center text-lg font-bold">
                        {s.name.charAt(0)}
                      </div>
                    )}

                    <div>
                      <p className="text-lg font-semibold text-white">{s.name}</p>
                      <p className="text-sm text-gray-400">{s.email}</p>
                    </div>
                  </div>
                  <button
                    className="text-sm bg-cyan-500 hover:bg-cyan-400 text-black px-3 py-1 rounded-md mr-2"
                    onClick={() => {
                      setEditingId(s.id);
                      setEditName(s.name);
                      setEditEmail(s.email);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    disabled={!adminMode}
                    className={`text-sm px-3 py-1 rounded-md
                         ${!adminMode ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-500 hover:bg-red-400'}
                        `}
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </>
              )}

              {/* 🔽 SECCIÓN DE CURSOS */}
              <div style={{ marginTop: '10px' }}>
                <select
                  className="bg-slate-900 border border-cyan-500/40 text-white rounded-lg px-3 py-1 mt-3"
                  onChange={async e => {
                    const courseId = Number(e.target.value);
                    console.log('Asignando curso:', courseId);

                    if (!courseId) return;

                    const response = await assignCourseToStudent(s.id, courseId);
                    console.log('Respuesta del backend:', response);

                    await loadStudentCourses(s.id);
                  }}
                >
                  <option value="">Assign Courses</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => loadStudentCourses(s.id)}
                  className="mt-2 px-3 py-1 text-sm border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-lg transition"
                >
                  View Courses
                </button>

                <ul className="mt-2 text-sm text-gray-300 space-y-1 list-disc list-inside">
                  {studentCourses[s.id]?.map(course => (
                    <li key={course.id}>{course.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-gray-300">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
          className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};
