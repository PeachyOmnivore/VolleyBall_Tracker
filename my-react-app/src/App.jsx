import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
// import ToggleSwitch from "./components/toggleSwitch/toggleSwitch";

function App() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        {/* <Route path="test" element={<ToggleSwitch />} /> */}
      </Routes>
    </>
  );
}

export default App;
