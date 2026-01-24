import { Board } from './modelSkateboard';
import  { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"

gsap.registerPlugin(ScrollTrigger)

export function MainScene() {
    const boardRef = useRef();
    const boardFlipRef = useRef();
    const initialPosition = [0, 0, 0];

    const [rotations, setRotations] = useState({
        trickname: "",
        x_rot: 0,
        y_rot: 0,
        z_rot: 0
    });

    function frame(f) {
        return( f / 30);
    };

    // "http://localhost:8000/api/v1/tricks/kickflip"

    useEffect( () => {
        let ignoreStaleRequest = false;

        fetch("http://localhost:8000/api/v1/tricks/tre", { credentials: "same-origin" })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            if (!ignoreStaleRequest) {
                setRotations(data);

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
                        y: `+=${data.trick.y_rot}`, // + is front shuvit
                    }, frame(3))
                    .to(boardFlipRef.current.rotation, {
                        x: `+=${data.trick.x_rot}`, // + is heelflip
                    }, frame(3))
                    .to(boardRef.current.position, {
                        y: "-=2",
                        duration: frame(3),
                        ease: "linear",
                    })
            }
        })
        .catch((error) => console.log(error));

        return () => {
            ignoreStaleRequest = true;
        };
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
