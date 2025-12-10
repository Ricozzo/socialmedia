import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login/index.tsx";
import SignUpPage from "./Pages/Signup/index.tsx";
import IsAnon from "./Components/isAnon/index.tsx";
import AddEvents from "./Pages/AddEvent/index.tsx";
import DetailsEvent from "./Pages/Details/index.tsx";
import UpdateEvent from "./Pages/EditEvent/index.tsx";
import MyProfile from "./Pages/MyProfile/index.tsx";

function Navbar() {
  return <header>Barra de Navegação Aqui</header>;
}
function Footer() {
  return <footer>Rodapé da Aplicação</footer>;
}
function HomePage() {
  return <h1>Página Inicial</h1>;
}

function App() {
  return (
    <div className="App">
            <Navbar /> 
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
          path="/login"
          element={
            <IsAnon>
              <LoginPage />       
            </IsAnon>
          }
        />
         
      </Routes>
            <Footer />
    </div>
  );
}

export default App;
