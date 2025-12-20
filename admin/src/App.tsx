import { Toaster } from "@/components/ui/sonner";
import AppRouter from "@/providers/AppRouter";
function App() {
  return (
    <>
      <Toaster richColors />
      <AppRouter />
    </>
  );
}

export default App;
