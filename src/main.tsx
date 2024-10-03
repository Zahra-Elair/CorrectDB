import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./app/hero.tsx";
import RootLayout from "./app/layout.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { ModeToggle } from "./components/mode-toggle.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/db",
    element: <Hero />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RootLayout>
        <div className="absolute top-4 right-4 z-10">
          <ModeToggle />
        </div>
        <RouterProvider router={router} />
      </RootLayout>
    </ThemeProvider>
  </StrictMode>
);
