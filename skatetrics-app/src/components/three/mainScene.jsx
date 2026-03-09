import { Board } from './modelSkateboard';
import  { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import { extend } from '@react-three/fiber'

gsap.registerPlugin(ScrollTrigger)

export function MainScene({ trick, ridingStance }) {
    const boardRef = useRef();
    const boardFlipRef = useRef();
    const initialPosition = [0, 0, 0];
    const reggoof = ridingStance === "Goofy" ? -1 : 1;

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
        let timeline;
        
        fetch(`http://localhost:8000/api/v1/tricks/${trick}`, { credentials: "same-origin" })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            if (!ignoreStaleRequest) {
                setRotations(data);
                console.log(`${trick}`)

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: 'body',
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                        markers: true,
                    }
                });
                var y_rot = reggoof * data.trick.y_rot;
                var x_rot = reggoof * data.trick.x_rot;
                timeline
                    .to(boardRef.current.rotation, {
                        z: `+=${data.trick.z_rot}`, // - is nollie
                        duration: frame(3),
                        ease: "linear",
                    }, frame(0))
                    .to(boardRef.current.position, {
                        y: "+=2",
                        duration: frame(3),
                        ease: "linear",
                    }, frame(3))
                    .to(boardRef.current.rotation, {
                        z: `-=${data.trick.z_rot}`,
                        y: `+=${y_rot}`, // + is front shuvit
                    }, frame(3))
                    .to(boardFlipRef.current.rotation, {
                        x: `+=${x_rot}`, // + is heelflip
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
            if (timeline) timeline.kill(); // clean up on unmount or trick change
            ScrollTrigger.getAll().forEach(st => st.kill()); // optional: remove old scroll triggers
        };
    }, [trick, ridingStance]);

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
