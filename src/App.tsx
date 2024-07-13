import { Route, Routes, useLocation } from "react-router-dom"
import NotFoundPage from "./pages/NotFoundPage"
import HomePage from "./pages/HomePage";
import VerifyPage from "./pages/VerifyPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const location = useLocation();
  return (
    <>
      <section className="bg-white hidden md:flex lg:flex justify-center items-center w-full h-screen fixed z-[99999] overflow-hidden">
        <h1>لطفا برنامه را در موبایل باز کنید </h1>
      </section>
      <Routes location={location} key={location.pathname}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

    </>
  )
}

export default App
