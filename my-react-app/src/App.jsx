import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home"

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
