import {MainCanvas} from "../components/three/mainCanvas"

export default function Home() {
  return (
    <div className="h-[600vh] flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <MainCanvas />
    </div>
  );
}
