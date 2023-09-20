import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from './pages/HomePage';
import Shelter from "./pages/Shelter";
import RegisterShelter from "./pages/RegisterShelter";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState();

  useEffect(() => console.log(isLoggedIn, accessToken), [accessToken]);
  useEffect(() => {
    const loggedToken = localStorage.getItem("accessToken");
    console.log(loggedToken);
    if (loggedToken) {
      setAccessToken(loggedToken);
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, [accessToken]);
  return (
    <Router>
      <Routes>
        
        <Route
          path="/login"
          element={
            <LoginPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setAccessToken={setAccessToken}
            />
          }
        />
        <Route
        path="/"
        element={
          <HomePage
            isLoggedIn={isLoggedIn}
            accessToken={accessToken}
          />
        }
      />
        <Route
          path="/shelters"
          element={
            <Shelter isLoggedIn={isLoggedIn} accessToken={accessToken} />
          }
        />
        <Route
          path="/register-shelter"
          element={
            <RegisterShelter
              isLoggedIn={isLoggedIn}
              accessToken={accessToken}
            />
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
