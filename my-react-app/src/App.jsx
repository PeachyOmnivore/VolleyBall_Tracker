import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home"
import Registration from "./pages/registration/registration";

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="registration" element={<Registration/>} />
      </Routes>
    </>
  );
}

export default App;
