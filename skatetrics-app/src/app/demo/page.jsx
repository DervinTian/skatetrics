import {MainCanvas} from "../../components/three/mainCanvas"

export default function Demo() {
    return(
        <div className="h-[500vh] flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <MainCanvas />
        </div>
    );
}