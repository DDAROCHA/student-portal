import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import { ParticlesBackground } from './ParticlesBackground';

const COLORS = ['#22d3ee', '#ec4899', '#22c55e', '#facc15', '#8b5cf6'];

const API_URL = process.env.REACT_APP_API_URL;

interface Stats {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
}

interface CourseStats {
  name: string;
  value: number;
}

export const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
  });

  interface CourseStat {
    name: string;
    value: number;
  }

  const [courseData, setCourseData] = useState<CourseStat[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/dashboard`)
      .then(res => res.json())
      .then(data => setStats(data));

    fetch(`${API_URL}/stats/students-per-course`)
      .then(res => res.json())
      .then(data => {
        setCourseData(data);
      });
  }, []);

  return (
    <>
      <ParticlesBackground />

      <div className="relative z-10 min-h-screen text-white p-10">
        <h1 className="text-5xl font-bold mb-10 text-pink-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">
          Student Portal Dashboard
        </h1>

        {/* STATS CARDS */}

        <div className="grid grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-cyan-500/50 transition transform hover:-translate-y-2 hover:shadow-cyan-500/30"
          >
            <h2 className="text-xl text-gray-400">Students</h2>
            <p className="text-5xl font-bold text-cyan-400">
              <CountUp end={stats.totalStudents} duration={2} />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-cyan-500/50 transition transform hover:-translate-y-2 hover:shadow-cyan-500/30"
          >
            <h2 className="text-xl text-gray-400">Courses</h2>
            <p className="text-5xl font-bold text-pink-400">
              <CountUp end={stats.totalCourses} duration={2} />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-cyan-500/50 transition transform hover:-translate-y-2 hover:shadow-cyan-500/30"
          >
            <h2 className="text-xl text-gray-400">Enrollments</h2>
            <p className="text-5xl font-bold text-green-400">
              <CountUp end={stats.totalEnrollments} duration={2} />
            </p>
          </motion.div>
        </div>

        {/* DONUT CHART */}

        <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl mt-10 border border-cyan-500/40">
          <h2 className="text-xl text-cyan-400 mb-2">Students per Course</h2>
          <p className="text-sm text-gray-400 mb-4">
            Distribution of students enrolled in each course
          </p>

          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: 'easeInOut',
            }}
            className="w-full h-[360px] relative"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseData}
                  dataKey="value"
                  nameKey="name"
                  cx="65%"
                  cy="50%"
                  outerRadius={130}
                  innerRadius={75}
                  paddingAngle={4}
                >
                  {courseData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                      style={{
                        filter: 'drop-shadow(0px 0px 8px rgba(34,211,238,0.8))',
                      }}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value?: number, name?: string) => [
                    `${value ?? 0} ${value === 1 ? 'student' : 'students'}`,
                    name ?? 'Course',
                  ]}
                  contentStyle={{
                    backgroundColor: '#020617',
                    border: '1px solid #22d3ee',
                    borderRadius: '10px',
                  }}
                  labelStyle={{
                    color: '#22d3ee',
                  }}
                  itemStyle={{
                    color: '#22d3ee',
                  }}
                />

                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{
                    color: '#cbd5f5',
                    paddingLeft: '20px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* TOTAL BELOW DONUT */}

            <div className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-2 pointer-events-none">
              <span className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]">
                {courseData.reduce((acc, cur) => acc + cur.value, 0)}
              </span>

              <span className="text-sm text-gray-400">Total Students</span>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
