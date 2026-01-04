import React, { useContext, useState, useEffect } from "react";
import { Bell, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../Components/Ui/input";
import { Button } from "../../Components/Ui/button";
import logoKaax from "../../assets/logoKaax.png";
import { AuthContext } from "../../Context/auth.context";
import profileService from "../../Services/profile.services";
import { IProfile } from "../../types";

export function Header() {
  const { isLoggedIn, logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estados da busca
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<IProfile[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/auth/login");
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length > 1) {
        setIsSearching(true);
        try {
          const response = await profileService.searchProfiles(searchTerm);
          console.log("Resultados da busca:", response.data);
          setResults(response.data);
        } catch (error) {
          console.error("Erro na busca:", error);
          setResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#fdfcf8] shadow-sm">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center shrink-0">
          <div className="flex -mt-4 h-32 w-32 items-center justify-center">
            <Link to="/">
              <img
                src={logoKaax}
                className="h-48 w-auto object-contain"
                alt="Kaax Logo"
              />
            </Link>
          </div>
          <Link
            to={"/"}
            className="text-4xl font-serif font-bold text-[#6c562c] tracking-tight ml-[-20px]"
          >
            Kaax
          </Link>
        </div>

        <div className="flex-1 max-w-md relative">
          <Input
            placeholder="Buscar pessoas pelo nome ou @username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-gray-100/50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#8d984c] transition-all outline-none text-[#6c562c]"
          />

          {(results.length > 0 || (searchTerm.length > 1 && !isSearching)) && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-[60]">
              <div className="max-h-[300px] overflow-y-auto p-2">
                {isSearching ? (
                  <div className="p-4 text-center text-sm text-gray-400 font-sans">
                    Buscando...
                  </div>
                ) : results.length > 0 ? (
                  results.map((profile) => (
                    <Link
                      key={profile.id}
                      to={`/profile/${profile.username}`}
                      onClick={() => setSearchTerm("")}
                      className="flex items-center gap-3 p-3 hover:bg-[#fdfcf8] rounded-xl transition-colors group"
                    >
                      <img
                        src={
                          profile.profile_picture_url || "/default-avatar.png"
                        }
                        className="h-10 w-10 rounded-full object-cover border border-gray-100"
                        alt={profile.username}
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-[#6c562c] group-hover:text-[#8d984c] transition-colors">
                          {profile.first_name} {profile.last_name}
                        </span>
                        <span className="text-xs text-gray-400">
                          @{profile.username}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : searchTerm.length > 1 ? (
                  <div className="p-4 text-center text-sm text-gray-400 font-sans">
                    Nenhum perfil encontrado com "{searchTerm}"
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-[#8d984c]"
              >
                <Bell className="h-5 w-5" />
              </Button>

              <Link to={`/profile/${user?.username}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-[#8d984c]"
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
