import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ASD from "./ASD";
import Cabinet from "./Cabinet";
import Station from "./Station";
import StationTable from "./StationTable";
import Dashboard from "./Dashboard";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard/:lineId/:lineName/:stationId/:stationName",
    element: <Dashboard />,
  },
  {
    path: "/asd/:lineId/:lineName/:stationId/:stationName/:asdId",
    element: <ASD />,
  },
  {
    path: "/cabinet/:lineId/:lineName/:stationId/:stationName",
    element: <Cabinet />,
  },
  {
    path: "/station/:lineId/:lineName/:stationId/:stationName",
    element: <Station />,
  },
  {
    path: "/stationTable/:lineId/:lineName/:stationId/:stationName",
    element: <StationTable />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

reportWebVitals();
