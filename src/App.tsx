import "./App.css";
import { UploadButton } from "./components/button";
import { PDF } from "./components/pdf";

function App() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="font-bold">PDF Waffleizer</h1>
      <UploadButton />
      <PDF />
    </main>
  );
}

export default App;
