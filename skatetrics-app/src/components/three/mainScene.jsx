import { Board } from './modelSkateboard';
import  { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

export function MainScene() {
    const boardRef = useRef();
    const boardSpinRef = useRef();
    const initialPosition = [-40, 0, 0];

    function frame(f) {
        return( f / 30);
    }

    useGSAP( () => {
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
            .to(boardRef.current.position, {
                x: "+=20",
                y: 0,
                z: 0,
                duration: frame(20),
            }, 0)
            .to(boardRef.current.rotation, {
                z: "+=0.698",
                duration: frame(3),
            }, frame(20))
            .to(boardRef.current.position, {
                x: "+=3",
                duration: frame(3),
            }, frame(20))
            .to(boardRef.current.position, {
                y: "+=3",
                duration: frame(3)
            }, frame(23))
            .to(boardRef.current.position, {
                x: "+=3",
                duration: frame(6),
            }, frame(23))
            .to(boardRef.current.rotation, {
                z: "-=0.698",
                x: "-=6.28",
                y: "-=6.28",
                duration: frame(4),
            }, frame(25))
            .to(boardRef.current.position, {
                x: "+=3",
                duration: frame(3),
            }, frame(25))
            .to(boardRef.current.position, {
                y: "-=3",
                x: "+=3",
                duration: frame(3),
            }, frame(31))
            .to(boardRef.current.position, {
                x: "+=30",
                y: 0,
                z: 0,
                duration: frame(30),
            }, frame(34))
    }, []);


    return(
        <>
        <group ref={boardRef} position={initialPosition}>
            <group ref={boardSpinRef}>
                <Board />
            </group>
        </group>
        </>
    );
}