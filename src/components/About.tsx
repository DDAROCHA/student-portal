import { ParticlesBackground } from './ParticlesBackground';

export const About = () => {
  return (
    <>
      <ParticlesBackground />

      <div className="relative z-10 min-h-screen text-white p-10">
        <h1 className="text-5xl font-bold mb-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
          About
        </h1>
      </div>
    </>
  );
};
