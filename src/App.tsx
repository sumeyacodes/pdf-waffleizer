import "./App.css";
import { GenerateAudio } from "./components/generate-audio";
import { Header } from "./components/header";
import { PDFViewer } from "./components/pdf-viewer";
import { UploadCard } from "./components/upload-card";

function App() {
  return (
    <main className="w-full min-h-screen bg-neutral-950 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Card section with its own header */}
        <section className="bg-neutral-950  w-full rounded-lg">
          <Header />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <UploadCard />
            <GenerateAudio />
          </div>
        </section>

        {/* PDF viewer */}
        <PDFViewer />
      </div>
    </main>
  );
}

export default App;
