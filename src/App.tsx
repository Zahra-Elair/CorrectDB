import RootLayout from "./app/layout";
import { ModeToggle } from "./components/mode-toggle";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./app/hero";
import Auth from "./app/auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/db",
      element: <Hero />,
    },
  ]);
  return (
    <RootLayout>
      <RouterProvider router={router} />
      <ModeToggle />
    </RootLayout>
  );
}

export default App;
