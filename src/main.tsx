import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./app/hero.tsx";
import RootLayout from "./app/layout.tsx";

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
    <RootLayout>
      <RouterProvider router={router} />
    </RootLayout>
  </StrictMode>
);
