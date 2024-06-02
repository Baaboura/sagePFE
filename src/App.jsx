import React from "react";
import CustomRoutes from "./routes";
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import { useAuth } from "./hooks/auth";
import LoadingPage from "./pages/loading";

import "./styles.css";


export const App = () => {
  const { isLoaded } = useAuth();


  if (!isLoaded) return <LoadingPage />;

  const router = createBrowserRouter(CustomRoutes());
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
};
