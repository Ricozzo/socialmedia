import React from "react";
import { Search, Bell, Settings, Leaf } from "lucide-react";
import { Input } from "../../Components/Ui/input";
import { Button } from "../../Components/Ui/button";
import logoKaax from "../../assets/kaax-w-bg.png";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-green/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full">
            <div className="flex h-14 w-14 items-center justify-center rounded-full">
              <img
                src={logoKaax}
                alt="Kaax Logo"
              />
            </div>
          </div>
          <span className="text-xl font-bold text-foreground">Kaax</span>
        </div>

        <div className="hidden flex-1 max-w-md mx-8 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar eventos, pessoas..."
              className="pl-10 bg-secondary border-0"
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
