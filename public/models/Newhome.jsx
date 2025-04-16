

import React from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Model(props) {
  const { scene } = useGLTF('/models/newhome.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)


  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh geometry={nodes.Object_7.geometry} material={materials['5_belt_1.0_0_0.001']} skeleton={nodes.Object_7.skeleton} />
          <skinnedMesh geometry={nodes.Object_9.geometry} material={materials['5_cloth_1.0_0_0.001']} skeleton={nodes.Object_9.skeleton} />
          <skinnedMesh geometry={nodes.Object_11.geometry} material={materials['5_eyes_1.0_0_0.001']} skeleton={nodes.Object_11.skeleton} />
          <skinnedMesh geometry={nodes.Object_13.geometry} material={materials['5_face_1.0_0_0.001']} skeleton={nodes.Object_13.skeleton} />
          <skinnedMesh geometry={nodes.Object_15.geometry} material={materials['5_hair_1.0_0_0.001']} skeleton={nodes.Object_15.skeleton} />
          <skinnedMesh geometry={nodes.Object_17.geometry} material={materials['5_hands_1.0_0_0.001']} skeleton={nodes.Object_17.skeleton} />
          <skinnedMesh geometry={nodes.Object_19.geometry} material={materials['5_shoes_1.0_0_0.001']} skeleton={nodes.Object_19.skeleton} />
          <skinnedMesh geometry={nodes.Object_21.geometry} material={materials['5_skin_1.0_0_0.001']} skeleton={nodes.Object_21.skeleton} />
          <skinnedMesh geometry={nodes.Object_23.geometry} material={materials['7_decal_1.0_0_0']} skeleton={nodes.Object_23.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/newhome.glb')
