import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const HeroExperience = ({ lite = false }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      dpr={lite ? [1, 1.2] : [1, 1.5]}
      gl={{
        antialias: !lite,
        alpha: true,
        powerPreference: lite ? "default" : "high-performance",
      }}
    >
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={!isMobile && !lite}
        maxDistance={15}
        minDistance={2}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={lite ? 28 : isMobile ? 45 : 80} />
        <group
          scale={isMobile ? 0.7 : lite ? 0.9 : 1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room enableBloom={!lite} />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
