'use client'
import {Environment, OrbitControls} from "@react-three/drei"
import {Canvas} from "@react-three/fiber"
import { Board } from "./modelSkateboard"
import { MainScene } from "./mainScene"

export function MainCanvas() {
    return (
        <div className="w-screen h-screen fixed top-0 left-0" style={{backgroundColor: "black"}}>
            <Canvas
                shadow
                dpr={[1, 2]}
                camera={{fov: 55, position: [0, 0, 50]}}
            >
                <Environment files="/images/hill.jpg" />
                <MainScene />

            </Canvas>
        </div>
    );
}