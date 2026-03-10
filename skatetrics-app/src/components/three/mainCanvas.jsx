'use client'
import {Environment, OrbitControls} from "@react-three/drei"
import {Canvas} from "@react-three/fiber"
import { MainScene } from "./mainScene"

export function MainCanvas({ trick, ridingStance, trickStance }) {

    return (
        <div className="w-screen h-screen fixed top-20 left-0" style={{backgroundColor: "black"}}>
            <Canvas
                shadow
                dpr={[1,2]}
                // camera={{ fov: 55, position: [0, 0, 20] }}
                camera={{ fov: 55, position: [-24.711, 6.962, -0.1585] }}
                // camera={{ fov: 55, position: [24.711, 6.962, -0.1585] }}
                // onClick={canvasClicked}
            > 
                <Environment files="/images/hill.jpg" />
                <MainScene trick={trick} ridingStance={ridingStance} trickStance={trickStance}/>

            </Canvas>
        </div>
    );
}