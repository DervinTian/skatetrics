import { Board } from './modelSkateboard';
import  { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import { extend } from '@react-three/fiber'

gsap.registerPlugin(ScrollTrigger)

export function MainScene({ trick, ridingStance, trickStance }) {
    const boardRef = useRef();
    const boardFlipRef = useRef();
    const initialPosition = [0, 0, 0];
    var reggoof = ridingStance === "Goofy" ? -1 : 1;
    var adj_reggoof = reggoof;
    console.log(trickStance);

    // tricks look different according to each stance, so we need to account for that
    if(trickStance === "Regular"){
        adj_reggoof = reggoof * 1; // regular tricks are regular
    }
    else if(trickStance === "Switch"){
        adj_reggoof = reggoof * -1; // switch tricks are in the opposite riding stance
    }
    var nollie = 1;
    if(trickStance === "Nollie"){
        nollie = nollie * -1; // nollie tricks pop off the front of the nose, but the board spin is still the same
        adj_reggoof = reggoof * 1;
    }
    else if (trickStance === "Fakie"){
        nollie = nollie * -1; // fakie tricks are riding backwards, so we pop off of the "front", and the board spins the opposite way
        adj_reggoof = reggoof * -1;
    }

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
        var lowercase_trick = trick.toLowerCase();
        fetch(`http://localhost:8000/api/v1/tricks/${lowercase_trick}`, { credentials: "same-origin" })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            if (!ignoreStaleRequest) {
                setRotations(data);
                console.log(`${trick}`)

                const timeline = gsap.timeline({ // set a timeline
                    scrollTrigger: {
                        trigger: 'body',
                        start: "top top",
                        end: "bottom bottom",
                        scrub: true,
                        markers: true,
                    }
                });

                var y_rot = adj_reggoof * data.trick.y_rot; // apply the transformations given the stance to the trick's fundamental motion
                var x_rot = adj_reggoof * data.trick.x_rot;
                var z_rot = nollie * data.trick.z_rot;

                timeline
                    .to(boardRef.current.rotation, { // perform the pop
                        z: `+=${z_rot}`, // - is nollie
                        duration: frame(3),
                        ease: "linear",
                    }, frame(0))
                    .to(boardRef.current.position, { // allow the board to go up
                        y: "+=2",
                        duration: frame(3),
                        ease: "linear",
                    }, frame(3))
                    .to(boardRef.current.rotation, { // do the correct shuv it rotation
                        z: `-=${z_rot}`,
                        y: `+=${y_rot}`, // + is front shuvit
                    }, frame(3))
                    .to(boardFlipRef.current.rotation, { // do the correct flip rotation relative to the shuv it rotation
                        x: `+=${x_rot}`, // + is heelflip
                    }, frame(3))
                    .to(boardRef.current.position, { // bring the board back down to the ground
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
    }, [trick, ridingStance, trickStance]);

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
