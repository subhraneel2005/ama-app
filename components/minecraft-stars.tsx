"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function MinecraftStars() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      className="fixed inset-0 -z-10"
      options={{
        background: {
          color: {
            value: "#090b1a",
          },
        },

        fpsLimit: 60,

        particles: {
          number: {
            value: 80,
          },

          color: {
            value: ["#ffffff", "#dbeafe", "#22c55e"],
          },

          shape: {
            type: "square",
          },

          size: {
            value: {
              min: 1,
              max: 2,
            },
          },

          opacity: {
            value: {
              min: 0.2,
              max: 0.8,
            },

            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },

          move: {
            enable: false,
          },
        },

        detectRetina: true,
      }}
    />
  );
}