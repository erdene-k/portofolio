/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import skyScene from "../assets/3d/sky.glb";
import { a } from "@react-spring/three";

const Sky = (props)=> {
  const islandRef = useRef();
  const sky = useGLTF(skyScene);

  return (
    <mesh>
      <primitive object={sky.scene}/>
    </mesh>
  );
}

export  default Sky;
