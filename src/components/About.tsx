import { ParticlesBackground } from './ParticlesBackground';

export const About = () => {
  return (
    <>
      <ParticlesBackground />

      <div className="relative z-10 min-h-screen text-white p-10">
        {/* TITLE */}
        <h1 className="text-5xl font-bold mb-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
          About This Application
        </h1>

        {/* INTRO */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-cyan-500/40 shadow-lg mb-10 max-w-5xl">
          <p className="text-gray-300 text-lg leading-relaxed">
            This project is a{' '}
            <span className="text-cyan-400 font-semibold">
              Full-Stack Student & Course Management Dashboard{' '}
            </span>
            designed as a practical demonstration of modern web development and cloud architecture.
          </p>

          <p className="text-gray-300 mt-4">
            The application allows administrators to manage students, assign courses, upload profile
            pictures, and visualize enrollment distribution through interactive charts.
          </p>

          <p className="text-gray-300 mt-4">
            The system was built using a{' '}
            <span className="text-yellow-400">cloud-based architecture</span>, combining a modern
            React frontend with a scalable Node.js backend deployed on AWS.
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10 max-w-6xl">
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-cyan-500/40 text-center">
            <p className="text-3xl font-bold text-cyan-400">Full</p>
            <p className="text-gray-400 text-sm">Stack Application</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-cyan-500/40 text-center">
            <p className="text-3xl font-bold text-green-400">REST</p>
            <p className="text-gray-400 text-sm">API Architecture</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-cyan-500/40 text-center">
            <p className="text-3xl font-bold text-purple-400">AWS</p>
            <p className="text-gray-400 text-sm">Cloud Infrastructure</p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-cyan-500/40 text-center">
            <p className="text-3xl font-bold text-yellow-400">SQL</p>
            <p className="text-gray-400 text-sm">Relational Database</p>
          </div>
        </div>

        {/* TECHNOLOGY STACK */}
        <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-6xl">
          {/* FRONTEND */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-cyan-500/40 shadow-lg">
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">Frontend</h2>

            <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
              <li>React</li>
              <li>TypeScript</li>
              <li>Create React App (CRA)</li>
              <li>Tailwind CSS</li>
              <li>Recharts (data visualization)</li>
              <li>Framer Motion animations</li>
              <li>Lucide React icons</li>
              <li>Component-based architecture</li>
            </ul>
          </div>

          {/* BACKEND */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-cyan-500/40 shadow-lg">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Backend</h2>

            <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
              <li>Node.js</li>
              <li>Express REST API</li>
              <li>PostgreSQL</li>
              <li>CRUD operations</li>
              <li>Pagination endpoints</li>
              <li>Student-Course relationship management</li>
              <li>Secure image upload workflow</li>
            </ul>
          </div>

          {/* CLOUD */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-cyan-500/40 shadow-lg">
            <h2 className="text-xl font-semibold text-purple-400 mb-4">Cloud Infrastructure</h2>

            <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
              <li>AWS EC2 – backend server</li>
              <li>AWS RDS – PostgreSQL database</li>
              <li>AWS S3 – image storage</li>
              <li>AWS S3 – frontend static hosting</li>
              <li>IAM permissions management</li>
              <li>Secure file uploads</li>
            </ul>
          </div>
        </div>

        {/* ARCHITECTURE */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-cyan-500/40 shadow-lg mb-10 max-w-4xl">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6">System Architecture</h2>

          <div className="flex flex-col items-center text-center space-y-3 text-gray-300">
            <div className="bg-slate-900 px-6 py-3 rounded-lg border border-cyan-500/40">
              React Frontend (CRA)
            </div>

            <div className="text-cyan-400">↓</div>

            <div className="bg-slate-900 px-6 py-3 rounded-lg border border-green-500/40">
              Node.js / Express REST API (EC2)
            </div>

            <div className="text-cyan-400">↓</div>

            <div className="bg-slate-900 px-6 py-3 rounded-lg border border-yellow-500/40">
              PostgreSQL Database (AWS RDS)
            </div>

            <div className="text-cyan-400">↓</div>

            <div className="bg-slate-900 px-6 py-3 rounded-lg border border-purple-500/40">
              File Storage (AWS S3)
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-cyan-500/40 shadow-lg max-w-5xl">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Application Features</h2>

          <ul className="space-y-3 text-gray-300 list-disc list-inside">
            <li>Create, edit and delete students.</li>

            <li>Upload student profile pictures directly to AWS S3.</li>

            <li>Assign multiple courses to each student.</li>

            <li>Display student course enrollments dynamically.</li>

            <li>Paginated student dashboard.</li>

            <li>Interactive donut chart visualizing course distribution.</li>

            <li>Modern animated UI with particle background.</li>
          </ul>
        </div>

        {/* FOOTER */}
        <div className="mt-16 pt-8 border-t border-cyan-500/20 text-center">
          <p className="text-lg text-cyan-400 font-semibold drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            Developed by Diego Da Rocha
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Full-Stack Developer — React · Node.js · PostgreSQL · AWS
          </p>

          <p className="text-xs text-gray-500 mt-4">© 2026 — Student Management System Demo</p>
        </div>
      </div>
    </>
  );
};
