import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import K6Analytics from "../pages/K6Analytics";
import Infrastructure from "../pages/Infrastructure";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/k6",
    element: <K6Analytics />,
  },
  {
    path: "/infrastructure",
    element: <Infrastructure />,
  },
]);