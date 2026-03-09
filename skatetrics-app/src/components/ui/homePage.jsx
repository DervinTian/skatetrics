'use client'

import { useState } from "react";
import { MainCanvas } from "../three/mainCanvas";

export function HomePage() {

    // function closeDropdown(){
    //     const dropdown = document.querySelector(".dropdown-box");

    //     dropdown.classList.remove("active");
    // }

    // function openDropdown() {
    //     const dropdown = document.querySelector(".dropdown-box");
    //     dropdown.classList.add("active");
    // }

    // window.addEventListener("load", () => {
    //     window.addEventListener("click", windowClickEvent => {
    //         const dropdownContent = document.querySelector(".dropdown-content");
    //         const dropdown = document.querySelector(".dropdown-box");
    //         const selectedItem = document.querySelector(".selected-item")

    //         if(dropdown.classList.contains("active")) {
    //             if(!dropdownContent.contains(windowClickEvent.target)){
    //                 closeDropdown();
    //             }
    //         }
    //         else if (selectedItem.contains(windowClickEvent.target)){
    //             openDropdown();
    //         }
    //     })
    // })

    const [inputValue, setInputValue] = useState("");
    const [submittedValue, setSubmittedValue] = useState("");
    const [ridingStance, setRidingStance] = useState("Regular");

    function SelectButtons({ value, setValue }) {
        const options = ["Regular", "Goofy"];

        return (
            <div className="flex gap-3 text-white">
            {options.map(option => (
                <button
                key={option}
                onClick={() => setValue(option)}
                className={`px-4 py-2 rounded 
                    ${value === option ? "bg-blue-500 text-white" : "bg-gray-200"}
                `}
                >
                {option}
                </button>
            ))}
            </div>
        );
        }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setSubmittedValue(inputValue);
        }
    };

    return (
        <>
            <div className="home-body">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <SelectButtons value={ridingStance} setValue={setRidingStance} />
            </div>

            <MainCanvas trick={submittedValue} ridingStance={ridingStance}/>
        </>
        // <div className="home-body">
        //     <div className="dropdown-box active">
        //         <div className="selected-item">
        //             <input type="text" name="" value="Select" readOnly id=""></input>
        //         </div>

        //         <div className="dropdown-content">
        //             <div className="search-input">
        //                 <input type="text" name="" id=""></input>
        //             </div>

        //             <ul>
        //                 <li className="dropdown-item active">Select</li>
        //                 <li className="dropdown-item">Kicflip</li>
        //                 <li className="dropdown-item">Tre Flip</li>
        //                 <li className="dropdown-item">Heelflip</li>
        //             </ul>
        //         </div>
        //     </div>
        // </div>


    );
}