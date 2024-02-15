import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";

import Loader from "../components/Loader";
import IsometricModel from "../models/IsometricModel";
const Home = () => {
  const [isRotating, setRotating] = useState(false);
  const adjustIslandForScreenSize = () => {
    let screenScale = [4, 4, 4];
    const screenPos = [0, 0, -100];
    let rotation = [0.5, -0.8, 0];
    // if (window.innerWidth < 768) {
    //   screenScale = [0.9, 0.9, 0.9];
    // } else {
    //   screenScale = [1, 1, 1];
    // }
    return [screenScale, screenPos, rotation];
  };

  // const adjustPlaneForScreenSize = () => {
  //   let screenScale, screenPos;
  //   if (window.innerWidth < 820) {
  //     screenScale = [1.5, 1.5, 1.5];
  //     screenPos = [0, -1.5, 0];
  //   } else {
  //     screenScale = [3, 3, 3];
  //     screenPos = [0, -4, -4];
  //   }
  //   return [screenScale, screenPos, rotation];
  // };

  const [screenScale, screenPos, rotation] = adjustIslandForScreenSize();

  return (
    <section className="home-page">
      <div className="canvas-container">
        <Suspense fallback={<Loader />}>
          <Canvas camera={{ near: 0.1, far: 1000 }}>
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            <hemisphereLight
              skyColor="#b1e1ff"
              intensity={1}
              groundColor="#000"
            />
            {/* <Sky isRotating={isRotating} />
          <Island
            position={screenPos}
            scale={screenScale}
            rotation={rotation}
            isRotating={isRotating}
            setRotating={setRotating}
          />
          <Bird />
          <Plane
            isRotating={isRotating}
            position={planeScreenPos}
            rotation={[0, 20.1, 0]}
            scale={planeScreenScale}
          /> */}
            <IsometricModel
              position={screenPos}
              scale={screenScale}
              rotation={rotation}
              isRotating={isRotating}
              setRotating={setRotating}
              className="isometric"
            />
          </Canvas>
        </Suspense>
      </div>
    </section>
  );
};

export default Home;
