import React, { useContext } from "react";
import { Bell, Settings, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../Components/Ui/input";
import { Button } from "../../Components/Ui/button";
import logoKaax from "../../assets/logoKaax.png";
import { AuthContext } from "../../Context/auth.context";

export function Header() {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/auth/login");
  };

  return (
    <header className="top-0 z-50 w-full border-b bg-[#fdfcf8] backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex -mt-6 h-40 w-40 items-center justify-center">
            <Link to="/">
              <img
                src={logoKaax}
                className="h-64 w-auto object-contain"
                alt="Kaax Logo"
              />
            </Link>
          </div>
          <Link
            to={"/"}
            className="text-4xl font-serif font-bold text-[#6c562c] tracking-tight"
          >
            Kaax
          </Link>
        </div>

        <div className="hidden flex-1 max-w-md mx-8 md:block">
          <div className="relative">
            <Input
              placeholder="Buscar eventos, pessoas..."
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-5 w-5" />
              </Button>

              <Link to={`/profile/${user?.username}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-[#6c562c] hover:text-red-700 hover:bg-red-50"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/auth/login">
                <Button variant="ghost" className="text-[#6c562c]">
                  Entrar
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#8d984c] hover:bg-[#7a8441] text-white rounded-xl">
                  Criar Conta
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
