import { useFrame } from "@react-three/fiber";
import React, { useRef,useEffect, useState } from "react";

export const Box = (props) => {
const [hovered ,setHovered]=useState(false)
const [rotate, setRotate] = useState(false);
  const ref = useRef()

  useFrame((_,delta)=>{
    if (rotate){
      ref.current.rotation.x +=  delta * rotate;
      ref.current.rotation.y += 0.5 * delta * rotate;
    }
  })
  return (
    <mesh
      {...props}
      ref={ref}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onPointerDown={() =>setRotate(!rotate)}
      onPointerOver={() =>  setHovered(true)}
      onPointerOut={() =>   setHovered(false)}
    >
      <boxGeometry />
      <meshBasicMaterial color={hovered ? "red" : "green"} wireframe />
    </mesh>
  );
}
