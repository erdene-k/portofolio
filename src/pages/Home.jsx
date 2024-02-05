import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Island from '../models/island'
import Loader from '../components/Loader'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
const Home = () => {
  const [isRotating, setRotating ] = useState(false)

  const adjustIslandForScreenSize = () =>{
    let screenScale;
    const screenPos = [0, -6.5, -43]
    let rotation = [0.1,4.7,0]
    if(window.innerWidth < 768){
      screenScale = [0.9,0.9,0.9]
    }
    else{
      screenScale = [1,1,1]
    }
    return [screenScale, screenPos, rotation]
  }


  const adjustPlaneForScreenSize = () =>{
    let screenScale, screenPos;
    if(window.innerWidth < 768){
      screenScale = [1.5,1.5,1.5]
      screenPos = [0, -1.5, 0]
    }
    else{
      screenScale = [3,3,3]
      screenPos = [0, -4, -4]
    }
    return [screenScale, screenPos, rotation]
  }

  const[screenScale, screenPos, rotation] = adjustIslandForScreenSize()
  const[planeScreenScale, planeScreenPos] = adjustPlaneForScreenSize()
  return (
    <section className="w-full h-screen relative">

    <Suspense fallback={<Loader/>}>
    <Canvas className={`w-full h-screen bg-transparent  ${isRotating ? 'cursor-grabbing': 'cursor-grab'}`}
      camera={{near:0.1, far:1000}}>
        <directionalLight position={[1,1,1]} intensity={2}/>
        <ambientLight intensity={0.5} />
        <hemisphereLight skyColor='#b1e1ff' intensity={1} groundColor="#000"/>
        <Sky/>
        <Island position={screenPos} scale={screenScale} rotation={rotation} isRotating={isRotating} setRotating={setRotating}/>
        <Bird/>
        <Plane  position={planeScreenPos} scale={planeScreenScale} rotation={[0,20,0]}  />
      </Canvas>
    </Suspense>
    </section>
  )
}

export default Home

      {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        PopUp
      </div> */}