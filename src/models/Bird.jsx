/* eslint-disable react/no-unknown-property */
import React, { useEffect, useRef } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import birdScene from "../assets/3d/bird.glb";
import { useFrame } from "@react-three/fiber";

const Bird = (props) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(birdScene);
  const {actions} = useAnimations(animations, ref)
  useEffect(()=>{
    actions['Take 001'].play()
  },[])
  useFrame(({ clock, camera }) => {
    // Update the Y position to simulate bird-like motion using a sine wave
    ref.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2;

    // Check if the bird reached a certain endpoint relative to the camera
    if (ref.current.position.x > camera.position.x + 10) {
      // Change direction to backward and rotate the bird 180 degrees on the y-axis
      ref.current.rotation.y = Math.PI;
    } else if (ref.current.position.x < camera.position.x - 10) {
      // Change direction to forward and reset the bird's rotation
      ref.current.rotation.y = 0;
    }

    // Update the X and Z positions based on the direction
    if (ref.current.rotation.y === 0) {
      // Moving forward
      ref.current.position.x += 0.01;
      ref.current.position.z -= 0.01;
    } else {
      // Moving backward
      ref.current.position.x -= 0.01;
      ref.current.position.z += 0.01;
    }
  });
  return (
    <mesh position={[-5, 2, 1]} scale={[0.003, 0.003, 0.003]} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Bird;
