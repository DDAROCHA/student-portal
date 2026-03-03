const API_URL = 'http://localhost:3001';

export const getCourses = async () => {
  const res = await fetch(`${API_URL}/courses`);
  return res.json();
};

export const assignCourseToStudent = async (studentId: number, courseId: number) => {
  const response = await fetch(`${API_URL}/students/${studentId}/courses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ courseId }), // 🔥 ESTO ES CLAVE
  });

  return response.json();
};

export const getStudentCourses = async (studentId: number) => {
  const res = await fetch(`${API_URL}/students/${studentId}/courses`);
  return res.json();
};
