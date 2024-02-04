import React from 'react'
import { Canvas } from '@react-three/fiber'
const Home = () => {
  return (
    <section className='w-full h-screen relative'>
      {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        PopUp
      </div> */}
      <Canvas className='w-full h-screen bg-transparent'
      camera={{near:0.1, far:1000}}>

      </Canvas>
    </section>
  )
}

export default Home