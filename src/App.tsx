import React from 'react';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Login/index.tsx";
import SignUpPage from "./Pages/Signup/index.tsx";
import IsAnon from "./Components/isAnon/index.tsx";
// import IsPrivate from "./Components/isPrivate"; // Não é usado se só o Login/Signup estão ativos

// 🛑 Componentes Temporariamente Removidos para parar o erro
// Se não estão importados, não podem ser usados!
/*
function Navbar() { return <div>Navbar placeholder</div>; }
function Footer() { return <div>Footer placeholder</div>; }
function HomePage() { return <div>Home placeholder</div>; }
function Events() { return <div>Events placeholder</div>; }
function EventDetailsPage() { return <div>Details placeholder</div>; }
function EditEventPage() { return <div>Edit placeholder</div>; }
*/

// --- Para testar, adicione funções de placeholder ---
// (Substitua pelos seus imports quando os componentes estiverem prontos)
function Navbar() { return null; }
function Footer() { return null; }
function HomePage() { return null; }
function Events() { return null; }
function EventDetailsPage() { return null; }
function EditEventPage() { return null; }


function App() {
  return (
    <div className="App">
      <Navbar /> 

      <Routes>
        {/* ROTAS COMENTADAS (usando componentes que não estão importados) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />
        
        {/* Rota para Edição (Privada) - COMENTADA */}
        {/*
        <Route
          path="/events/edit/:eventId"
          element={
            <IsPrivate>
              <EditEventPage />
            </IsPrivate>
          }
        />
        */}

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignUpPage />
            </IsAnon>
          }
        />
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