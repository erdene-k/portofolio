import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";

import IsometricModel from "../models/IsometricModel";
import { BrowserRouter } from "react-router-dom";
import Navbar from '../components/Navbar'
const Home = () => {
  const [isRotating, setRotating] = useState(false);
  const adjustIslandForScreenSize = () => {
    let screenScale = [5.5, 5.5, 5.5];
    const screenPos = [0, 0, -100];
    let rotation = [0.5, -0.8, 0];
    // if (window.innerWidth < 768) {
    //   screenScale = [0.9, 0.9, 0.9];
    // } else {
    //   screenScale = [1, 1, 1];
    // }
    return [screenScale, screenPos, rotation];
  };



  const [screenScale, screenPos, rotation] = adjustIslandForScreenSize();

  return (
    <BrowserRouter>
    <Navbar/>
      <section className="home-page">
      <div className="header"></div>
 
      
      <div className="canvas-container">
        {/* <Suspense fallback={<Loader />}>   </Suspense>*/}
        <div className="canvas-content">

          <Canvas camera={{ near: 0.1, far: 1000 }}>
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            <hemisphereLight
              skyColor="#b1e1ff"
              intensity={1}
              groundColor="#000"
            />

            <IsometricModel
              position={screenPos}
              scale={screenScale}
              rotation={rotation}
              isRotating={isRotating}
              setRotating={setRotating}
              className="isometric"
            />
          </Canvas>
        
        </div>

        <div className="info-text">     <b>Erdenechuluun KHUDERCHULUUN</b>
          <p>
            Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Totam perspiciatis veritatis commodi ducimus
            quaerat qui quas? Consectetur harum ipsam excepturi qui voluptatibus
            accusamus, repellendus fugit! Dolorum doloribus omnis possimus
            laboriosam. amet consecte Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Aperiam eveniet nam fuga reiciendis, harum ab quis
            atque neque quibusdam veniam beatae porro incidunt nihil cupiditate
            explicabo earum quia! Sapiente, non!tur adipisic Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Accusamus amet fugiat ratione
            beatae illum quam reiciendis architecto atque dignissimos. Est
            autem, voluptatem amet necessitatibus aut excepturi odio odit
            distinctio earum!ing elit. Officiis repellendus totam, quaerat sit
            corporis a culpa eveniet sed ex voluptate quasi explicabo cupiditate
            incidunt nesciunt vitae. Numquam reprehenderit debitis sapiente?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis culpa
            minus numquam! Unde molestias, impedit voluptate cumque, fugit
            possimus laborum quidem voluptatem, repellat alias perspiciatis illo
            tempore dolore explicabo nemo.
          </p>
        
        </div>
      </div>
      <div className="section full-height over-hide">
        <div className="slider-container">
          <div className="row full-height justify-content-center">
            <div className="col-lg-10 col-xl-8 align-self-center padding-tb">
              <div className="section mx-auto text-center slider-height-padding">
                <input
                checked
                  className="checkbox frst"
                  type="radio"
                  id="slide-1"
                  name="slider"
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
    
                <ul>
                  <li>
                    <span>Projects:</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente culpa laborum blanditiis qui id sequi hic architecto officia! Nemo at aspernatur reprehenderit, enim ipsam dolores expedita fuga inventore deserunt eius?</p>
                  </li>
                  <li>
                    <span>TOY PIG</span>
                  </li>
                  <li>
                    <span>SHY PORTRAIT</span>
                  </li>
                  <li>
                    <span>SKATEBOARD FACE</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id="gg" style={{backgroundColor:"red", height:100}}></div>
    </BrowserRouter>
  
  );
};

export default Home;


