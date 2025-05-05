import "./App.css";
import { GenerateAudio } from "./components/generate-audio";
import { Header } from "./components/header";
import { ViewPDF } from "./components/view-pdf";
import { UploadPDF } from "./components/upload-pdf";

function App() {
  return (
    <main className="w-full min-h-screen bg-neutral-950 py-10 px-4 space-y-10">
      <Header />

      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <UploadPDF />
        <GenerateAudio />
      </section>

      <ViewPDF />
    </main>
  );
}

export default App;
