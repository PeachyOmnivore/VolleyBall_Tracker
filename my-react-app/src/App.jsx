import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login/login";
import Home from "./pages/home/home"
import Registration from "./pages/registration/registration";
import { useEffect, useState } from "react";
import { get } from "./client-Functions";

function App() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState('')
  const [currentlyAdmin, setCurrentlyAdmin] = useState(false)

  useEffect(() => {
    async function findUser() {
      try {
        const foundUser = await get("users/me");

        if (foundUser.foundUser.role === "ADMIN") {
          setCurrentlyAdmin(true)
        }
        setCurrentUser(foundUser);

        if (!foundUser) {
          navigate('/login')
        }

      } catch (err) {
        console.error('Error fetching user info:', err);
      }
    }
    findUser()
  }, [navigate])


  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home user={currentUser}/>} />
        <Route path="registration" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
