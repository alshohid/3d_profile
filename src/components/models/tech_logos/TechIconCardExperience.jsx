import { Float, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import * as THREE from "three";

const TechIconCardExperience = ({ model, lite = false }) => {
  const { scene } = useGLTF(model.modelPath);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (model.name === "Three.js Interfaces") {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ color: "white" });
          }
        }
      });
    }
  }, [clonedScene, model.name]);

  return (
    <Canvas
      dpr={lite ? [1, 1.1] : [1, 1.5]}
      gl={{
        antialias: !lite,
        alpha: true,
        powerPreference: lite ? "default" : "high-performance",
      }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
      />

      <Float
        speed={lite ? 3.1 : 4.5}
        rotationIntensity={lite ? 0.25 : 0.5}
        floatIntensity={lite ? 0.45 : 0.9}
      >
        <group scale={model.scale} rotation={model.rotation}>
          <primitive object={clonedScene} />
        </group>
      </Float>
    </Canvas>
  );
};

export default TechIconCardExperience;
