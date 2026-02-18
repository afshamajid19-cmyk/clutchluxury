import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Cormorant Garamond for headings (light, regular, medium + italic)
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";

// Montserrat for body/UI (light, regular, medium, semibold + italic)
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/300-italic.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/400-italic.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";

createRoot(document.getElementById("root")!).render(<App />);
