import { useEffect, useState } from 'react';

interface Stats {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
}

export const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/dashboard')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <div>Total Students: {stats.totalStudents}</div>
      <div>Total Courses: {stats.totalCourses}</div>
      <div>Total Enrollments: {stats.totalEnrollments}</div>
    </div>
  );
};
