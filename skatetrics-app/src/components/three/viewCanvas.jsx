'use client'
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Board } from "./modelSkateboard"
import { useRef } from "react"
import { useThree } from '@react-three/fiber'
import { useFrame } from '@react-three/fiber'

function CameraLogger() {
  const { camera } = useThree()

  useFrame(() => {
    console.log(
      camera.position.x,
      camera.position.y,
      camera.position.z,
      camera.fov,
    )
  })

  return null
}

export function ViewCanvas() {
  const cameraRef = useRef()

  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black">
      <Canvas dpr={[1, 2]} shadows>
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[-24.711, 6.962, -0.1585]}
          fov={55}
        />

        <CameraLogger />

        <Environment files="/images/hill.jpg" />
        <Board />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  )
}
