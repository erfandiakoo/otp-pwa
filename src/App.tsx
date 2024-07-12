import { Route, Routes, useLocation } from "react-router-dom"
import NotFoundPage from "./pages/NotFoundPage"
import HomePage from "./pages/HomePage";
import VerifyPage from "./pages/VerifyPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const location = useLocation();
  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

    </>
  )
}

export default App
