import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Providers from "./providers/Providers";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Providers>
                <App />
                <Analytics />
            </Providers>
        </BrowserRouter>
    </StrictMode>
);
