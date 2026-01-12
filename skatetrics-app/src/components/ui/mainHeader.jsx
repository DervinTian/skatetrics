"use client"

export function MainHeader() {
    const handleHover = (e) => {
        console.log('Mouse hovered!');
        e.target.style.textDecoration = "underline";
    }

    const handleLeave = (e) => {
        console.log('Mouse left!');
        e.target.style.textDecoration = "none";
    }

    return(
        <div className="top-bar text-white">
            <button
                type="button"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onClick={() => {window.location.href = "/"}}
                className="w-auto h-auto"
            >
                Home
            </button>
            <button
                type="button"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onClick={() => {window.location.href = "/demo"}}
                className="w-auto h-auto"
            >
                Demo
            </button>
        </div>
    );
}