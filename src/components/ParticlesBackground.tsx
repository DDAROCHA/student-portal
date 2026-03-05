import Particles from '@tsparticles/react';
import { useEffect, useState } from 'react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
      }}
      options={{
        background: {
          color: {
            value: '#000000',
          },
        },
        particles: {
          number: {
            value: 80,
          },
          color: {
            value: '#22d3ee',
          },
          links: {
            enable: true,
            color: '#22d3ee',
            distance: 150,
          },
          move: {
            enable: true,
            speed: 1,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
          },
          modes: {
            repulse: {
              distance: 100,
            },
          },
        },
      }}
    />
  );
};
