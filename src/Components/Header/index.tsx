import React from "react";
import { Bell, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "../../Components/Ui/input";
import { Button } from "../../Components/Ui/button";
import logoKaax from "../../assets/logoKaax.png";

export function Header() {
  return (
    <header className="top-0 z-50 w-full border-b bg-[#fdfcf8] backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="flex -mt-6 h-40 w-40 items-center justify-center">
            <img
              src={logoKaax}
              className="h-64 w-auto object-contain"
              alt="Kaax Logo"
            />
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
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
