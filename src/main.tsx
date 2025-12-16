import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Cormorant Garamond for headings
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";

// Inter for body/UI
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

createRoot(document.getElementById("root")!).render(<App />);
