import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./utils/Routes/routes";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<></>}>
      <div className="capitalize">
        <RouterProvider router={router} />
      </div>
    </Suspense>
  );
}

export default App;
