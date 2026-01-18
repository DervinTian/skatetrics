import {ViewCanvas} from "../components/three/viewCanvas"

export default function Home() {
  return (
    <div className="h-[500vh] flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ViewCanvas />
    </div>
  );
}
