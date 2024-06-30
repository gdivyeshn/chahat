import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./utils/Routes/routes";
import { Suspense } from "react";
import LogoLoadingScreen from "./components/LogoLoadingScreen";

function App() {
  return (
    <Suspense fallback={<LogoLoadingScreen />}>
      <div className="capitalize">
        <RouterProvider router={router} />
      </div>
    </Suspense>
  );
}

export default App;
