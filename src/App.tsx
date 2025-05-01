import "./App.css";
import { GenerateAudio } from "./components/generate-audio";
import { Header } from "./components/header";
import { ViewPDF } from "./components/view-pdf";
import { UploadPDF } from "./components/upload-pdf";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main className="w-full min-h-screen bg-neutral-950 py-10 px-4 space-y-10">
        <Header />

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <UploadPDF />
          <GenerateAudio />
        </section>

        <ViewPDF />
      </main>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
