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
      <h1>Kami sama</h1>

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
          <div className="info-text">
            <p>
              Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Totam perspiciatis veritatis commodi ducimus
              quaerat qui quas? Consectetur harum ipsam excepturi qui
              voluptatibus accusamus, repellendus fugit! Dolorum doloribus omnis
              possimus laboriosam. amet consecte Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Aperiam eveniet nam fuga
              reiciendis, harum ab quis atque neque quibusdam veniam beatae
              porro incidunt nihil cupiditate explicabo earum quia! Sapiente,
              non!tur adipisic Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Accusamus amet fugiat ratione beatae illum quam
              reiciendis architecto atque dignissimos. Est autem, voluptatem
              amet necessitatibus aut excepturi odio odit distinctio earum!ing
              elit. Officiis repellendus totam, quaerat sit corporis a culpa
              eveniet sed ex voluptate quasi explicabo cupiditate incidunt
              nesciunt vitae. Numquam reprehenderit debitis sapiente? Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Quis culpa
              minus numquam! Unde molestias, impedit voluptate cumque, fugit
              possimus laborum quidem voluptatem, repellat alias perspiciatis
              illo tempore dolore explicabo nemo.
            </p>
          </div>
        </Suspense>
      </div>
      <div className="section over-hide px-4 px-sm-0">
        <div className="container">
          <div className="full-width row justify-content-center">
            <div className="full-width align-self-center padding-tb">
              <div className="section mx-auto text-center slider-height-padding">
                <input
                  className="checkbox frst"
                  type="radio"
                  id="slide-1"
                  name="slider"
                  checked
                />
                <label htmlFor="slide-1"></label>
                <input
                  className="checkbox scnd"
                  type="radio"
                  name="slider"
                  id="slider-2"
                />
                <label htmlFor="slider-2"></label>
                <input
                  className="checkbox thrd"
                  type="radio"
                  name="slider"
                  id="slider-3"
                />
                <label htmlFor="slider-3"></label>
                <input
                  className="checkbox foth"
                  type="radio"
                  name="slider"
                  id="slider-4"
                />
                <label htmlFor="slider-4"></label>
                <ul>
                  <li>
                    <span>MALE GOOFY FACE</span>
                  </li>
                  <li>
                    <span>TOY PIG</span>
                  </li>
                  <li>
                    <span>SHY PORTRAIT</span>
                  </li>
                  <li>
                    <span>SKATEBOARD FACE
                      asdf
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
