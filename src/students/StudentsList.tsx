import React, { useEffect, useState } from 'react';

import { getCourses, getStudentCourses, assignCourseToStudent } from '../services/courseService';

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
    fetch('http://localhost:3001/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data.students);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
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

    fetchStudents();
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

  if (loading) return <p>Loading...</p>;

  //console.log('Courses state:', courses);

  return (
    <div>
      <h2>Students</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            if (e.target.files) {
              setSelectedFile(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Add Student</button>
      </form>

      <ul>
        {students.map(s => (
          <li key={s.id} style={{ marginBottom: '20px' }}>
            {editingId === s.id ? (
              <>
                <input value={editName} onChange={e => setEditName(e.target.value)} />
                <input value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                <button onClick={() => handleUpdate(s.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {s.name} ({s.email})
                <button
                  onClick={() => {
                    setEditingId(s.id);
                    setEditName(s.name);
                    setEditEmail(s.email);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
                {s.avatar_url && (
                  <img
                    src={s.avatar_url}
                    alt={s.name}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: 10,
                    }}
                  />
                )}
              </>
            )}

            {/* 🔽 SECCIÓN DE CURSOS */}
            <div style={{ marginTop: '10px' }}>
              <select
                onChange={async e => {
                  const courseId = Number(e.target.value);
                  console.log('Asignando curso:', courseId);

                  if (!courseId) return;

                  const response = await assignCourseToStudent(s.id, courseId);
                  console.log('Respuesta del backend:', response);

                  await loadStudentCourses(s.id);
                }}
              >
                <option value="">Asignar curso</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>

              <button onClick={() => loadStudentCourses(s.id)}>Ver cursos</button>

              <ul>
                {studentCourses[s.id]?.map(course => (
                  <li key={course.id}>{course.name}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
