import { Board } from './modelSkateboard';
import  { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger)

export function MainScene() {
    const boardRef = useRef();
    const boardFlipRef = useRef();
    const initialPosition = [0, 0, 0];

    function frame(f) {
        return( f / 30);
    }

    useGSAP( () => {
        if (!boardRef.current) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                markers: true,
            }
        });

        timeline
            .to(boardRef.current.rotation, {
                z: "+=0.698132",
                duration: frame(3),
                ease: "linear",
            }, frame(0))
            .to(boardRef.current.position, {
                y: "+=2",
                duration: frame(3),
                ease: "linear",
            }, frame(3))
            .to(boardRef.current.rotation, {
                z: "+=-0.698132",
                y: "+=-3.14", // + is shuvit
            }, frame(3))
            .to(boardFlipRef.current.rotation, {
                // x: "+=-6.28", // + is kickflip
            }, frame(3))
            .to(boardRef.current.position, {
                y: "-=2",
                duration: frame(3),
                ease: "linear",
            })
    }, []);



    return(
        <>
        <group ref={boardRef} position={initialPosition}>
            <group ref={boardFlipRef}>
                <Board />
            </group>
        </group>
        </>
    );
}
