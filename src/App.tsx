import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login/index.tsx";
import SignUpPage from "./Pages/Signup/index.tsx";
import IsAnon from "./Components/isAnon/index.tsx";
import IsPrivate from "./Components/isPrivate/index.tsx";
import AddEvents from "./Pages/AddEvent/index.tsx";
import DetailsEvent from "./Pages/Details/index.tsx";
import UpdateEvent from "./Pages/EditEvent/index.tsx";
import MyProfile from "./Pages/MyProfile/index.tsx";
import UpdateMyProfile from "./Pages/EditMyProfile/index.tsx";
import HomePage from "./Pages/Home/index.tsx";

function App() {
  return (
    <div className="App">
      <Routes>
                <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<AddEvents />} />
        <Route path="/events/:eventId" element={<DetailsEvent />} />
        <Route path="/events/edit/:eventId" element={<UpdateEvent />} />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignUpPage />       
            </IsAnon>
          }
        />
        <Route path="/profile/:username" element={<MyProfile />} />
        <Route
          path="/profile/edit"
          element={
            <IsPrivate>
              <UpdateMyProfile />
            </IsPrivate>
          }
        />
        <Route
          path="/auth/login"
          element={
            <IsAnon>
              <LoginPage />       
            </IsAnon>
          }
        />
         
      </Routes>
    </div>
  );
}

export default App;
