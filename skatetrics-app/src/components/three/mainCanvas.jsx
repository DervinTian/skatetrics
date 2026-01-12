'use client'
import {Environment, OrbitControls} from "@react-three/drei"
import {Canvas} from "@react-three/fiber"

export function MainCanvas() {
    return (
        <div className="w-screen h-screen fixed top-0 left-0">
            <Canvas
                shadow
                dpr={[1, 2]}
                camera={{fov: 55, position: [0, 0, 6]}}
            >
                <Environment files="/images/hill.jpg" />
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="red"/>
                </mesh>

                <OrbitControls />

            </Canvas>
        </div>
    );
}