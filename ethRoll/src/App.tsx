import {BrowserRouter, Routes, Route} from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { Error } from "./pages/Error";
import { Tip } from "./pages/Tip";

function App() {
    return(
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tip" element={<Tip />} />
                <Route path="/error" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;