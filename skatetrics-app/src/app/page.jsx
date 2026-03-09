import {ViewCanvas} from "../components/three/viewCanvas"
import {HomePage} from "../components/ui/homePage"

export default function Home() {
  return (
    <div className="h-[500vh] flex min-h-screen items-center justify-center font-sans bg-black">
      <HomePage />
      {/* <ViewCanvas /> */}
    </div>
  );
}
